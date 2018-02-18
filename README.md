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

tasks.task1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("test chain value");
    }, 1000);
  });
};

tasks.task2 = (chainValue, arg1, arg2) => {
  console.log(`[chainValue: ${chainValue}, arg1: ${arg1}, arg2: ${arg2}]`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

module.exports = tasks;
```
You have to export all tasks that should be available. The name of the function is used as task name. All tasks should return a Promise. If they do not, the behavior is the same as `Promise.resolve()`. In sequential mode previously resolved values, are passed to the next task function. This feature is not available in parallel mode. In the above example, "task2" would receive "test chain value" as `chainValue` if "task1" was executed before. If no value was resolved `undefined` is passed. The given task arguments from the cli are passed to all tasks as separate variables. **Note**: The `chainValue` is always passed as first parameter to the function, followed by optional task arguments.



[License](https://github.com/code-chris/node-task-runner/blob/master/LICENSE)
------
