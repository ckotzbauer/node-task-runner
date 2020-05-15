# Node-Task-Runner

[![NPM](https://img.shields.io/npm/v/node-task-runner.svg)](https://www.npmjs.com/package/node-task-runner)


A promise-based dependency-free task runner for Node.
This library was inspired by the [Start-Runner](https://github.com/start-runner/start).


## Installation

```
npm install node-task-runner
```


## CLI

```
  Usage: ntr [options] <tasks> -- [arguments]

  Options:

    --file=<file>      tasks file path, tasks.js by default
    --parallel         execute tasks in parallel rather than in sequence
```

### Task definition

```js
const tasks = {};

tasks.task1 = (reporter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("test chain value");
    }, 1000);
  });
};

tasks.task2 = (reporter, chainValue, arg1, arg2) => {
  reporter(`[chainValue: ${chainValue}, arg1: ${arg1}, arg2: ${arg2}]`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

module.exports = {
  tasks: tasks,
  reporter: (m) => console.log(m)
};
```
You have to export all tasks that should be available. The name of the function is used as task name. All tasks should return a Promise. If they do not, the behavior is the same as `Promise.resolve()`.

The `reporter` function which is passed to all tasks as first argument should be used to emit output to the command line. This is important in parallel mode to avoid mixed up task output. The runner collects all output submitted through the `reporter` function and emits all if a task finishes. In non-parallel mode the output is emitted immediately as `console.log` would do. The `reporter` function can be set with an export in the tasks-file as shown above. `console.log` will be the default-value
if no reporter is exported.

In sequential mode previously resolved values, are passed to the next task function as second parameter. This feature is not available in parallel mode. In the above example, "task2" would receive "test chain value" as `chainValue` if "task1" was executed before. If no value was resolved `undefined` is passed.

The given task arguments from the cli are passed to all tasks as separate variables.

Messages of this library are colored, if `chalk` is installed.

## Run tasks manually
```js
const ntr = require('node-task-runner');

...

tasks.task3 = (reporter) => {
  return Promise.all([ntr.runTask("task1", true), ntr.runTask("task2", true)]);
};

...
```

## Run functions manually
```js
const ntr = require('node-task-runner');

...

tasks.task3 = (reporter) => {
  return Promise.all([ntr.runFunction("func1", () => { /* do something */ }, true), ntr.runFunction("func2", () => { /* do something */ }, true)]);
};

...
```

You could run other tasks or functions sequentially or parallel from another task too. The last argument indicates if console outputs should be collected and emitted on
task-end or if they should be printed immediately. Default value is `false`.

[License](https://github.com/ckotzbauer/node-task-runner/blob/master/LICENSE)
------
