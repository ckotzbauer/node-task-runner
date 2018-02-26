#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const args = require('./arguments')(process.argv);
let output = {};
let chalk;
try { chalk = require('chalk'); } catch (e) {}

function message(m, color) {
  console.log(color && chalk && chalk.keyword(color) ? chalk.keyword(color)(m) : m);
}

function reporter(id, reportFunction, message) {
  if (args.options.parallel) {
    const a = output[id] || [];
    a.push(message);
    output[id] = a;
  } else {
    reportFunction(message);
  }
}

function printOutput(id, reportFunction) {
  const a = output[id] || [];
  a.forEach((m) => reportFunction(m));
  delete output[id];
}

function executeTask(name, chainValue, taskArgs, reportFunction) {
  const func = taskDefinition.tasks[name];

  if (func) {
    const id = Math.random().toString().replace('.', '');
    message(`Starting task ${name}...`, 'green');
    return func(reporter.bind(this, id, reportFunction), chainValue, ...taskArgs)
        .then(() => printOutput(id, reportFunction))
        .then(() => message(`Finished task ${name}...`, 'green'))
        .catch((err) => {
          printOutput(id, reportFunction);
          return Promise.reject(err);
        });
  } else {
    message(`Task ${name} does not exist!`, 'red');
    return Promise.resolve();
  }
}

const taskFile = path.resolve(process.cwd(), args.options.file);

if (!fs.existsSync(taskFile)) {
  message(`Specified task-file [${taskFile}] does not exist!`, 'red');
  process.exit(1);
}

const taskDefinition = require(taskFile);
const reportFunction = taskDefinition.reporter || function (m) { console.log(m); };

if (args.tasks.length === 0) {
  message(`Available tasks:\n- ${Object.keys(taskDefinition.tasks).join('\n- ')}`, 'yellow');
  process.exit(1);
}

if (args.options.parallel) {
  Promise.all(args.tasks.map((name) => executeTask(name, undefined, args.taskArgs, reportFunction)))
         .catch(() => process.exit(1));
} else {
  args.tasks.reduce(
    (current, next) => current.then((chainValue) => executeTask(next, chainValue, args.taskArgs, reportFunction)), 
    Promise.resolve())
      .catch(() => process.exit(1));
}
