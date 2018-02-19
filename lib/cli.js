#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const args = require('./arguments')(process.argv);
let chalk;
try { chalk = require('chalk'); } catch (e) {}

function message(m, color) {
  console.log(color && chalk && chalk.keyword(color) ? chalk.keyword(color)(m) : m);
}

function executeTask(name, chainValue, taskArgs) {
  const func = taskFunctions[name];

  if (func) {
    message(`Starting task ${name}...`, 'green');
    return func(chainValue, ...taskArgs).then(() => message(`Finished task ${name}...`, 'green'));
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

const taskFunctions = require(taskFile);

if (args.tasks.length === 0) {
  message(`Available tasks:\n- ${Object.keys(taskFunctions).join('\n- ')}`, 'yellow');
  process.exit(1);
}

if (args.options.parallel) {
  Promise.all(args.tasks.map((name) => executeTask(name, undefined, args.taskArgs)))
         .catch(() => process.exit(1));
} else {
  args.tasks.reduce((current, next) => current.then((chainValue) => executeTask(next, chainValue, args.taskArgs)), Promise.resolve())
      .catch(() => process.exit(1));
}
