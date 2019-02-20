#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const util = require('./util');
const args = require('./arguments')(process.argv);

const runTask = (name, parallel) => {
  return executeTask(name, undefined, [], parallel, reportFunction);
}

const runFunction = (name, func, parallel) => {
  return executeFunction(name, func, undefined, [], parallel, reportFunction);
}

const executeTask = (name, chainValue, taskArgs, parallel, reportFunction) => {
  if (!taskDefinition.tasks) {
    return Promise.resolve();
  }
  
  const func = taskDefinition.tasks[name];

  if (func) {
    return executeFunction(name, func, chainValue, taskArgs, parallel, reportFunction);
  } else {
    util.message(`Task ${name} does not exist!`, 'red');
    return Promise.resolve();
  }
}

const executeFunction = (name, func, chainValue, taskArgs, parallel, reportFunction) => {
  const id = Math.random().toString().replace('.', '');
  const start = Date.now();
  util.message(`Starting task ${name}...`, 'green');
  return (func(util.reporter.bind(util, id, parallel, reportFunction), chainValue, ...taskArgs) || Promise.resolve())
    .then(() => util.printOutput(id, reportFunction))
    .then(() => util.message(`Finished task ${name} in [${util.calculateDuration(start)}]...`, 'green'))
    .catch((err) => {
      util.printOutput(id, reportFunction);
      return Promise.reject(err);
    });
}

module.exports = {
  runTask: runTask,
  runFunction: runFunction
}

const taskFile = path.resolve(process.cwd(), args.options.file);

if (!fs.existsSync(taskFile)) {
  util.message(`Specified task-file [${taskFile}] does not exist!`, 'red');
  process.exit(1);
}

const taskDefinition = require(taskFile);
const reportFunction = taskDefinition.reporter || console.log;

if (args.tasks.length === 0) {
  util.message(`Available tasks:\n- ${Object.keys(taskDefinition.tasks).join('\n- ')}`, 'yellow');
  process.exit(1);
}

if (args.options.parallel) {
  Promise.all(args.tasks.map((name) => executeTask(name, undefined, args.taskArgs, args.options.parallel, reportFunction)))
         .catch((err) => {
           throw err;
         });
} else {
  args.tasks.reduce(
    (current, next) => current.then((chainValue) => executeTask(next, chainValue, args.taskArgs, args.options.parallel, reportFunction)), 
    Promise.resolve())
      .catch((err) => {
        throw err;
      });
}
