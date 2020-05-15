
module.exports = (argv) => {
  const args = Array.prototype.slice.call(argv);

  const result = {
    options: { parallel: false, file: args[0].indexOf("ts-node") === -1 ? 'tasks.js' : 'tasks.ts' },
    tasks: [],
    taskArgs: []
  };

  args.splice(0, 2);
  let argSeparatorDetected = false;

  for (const arg of args) {
    const equalIndex = arg.indexOf('=');
    const optName = equalIndex !== -1 ? arg.substr(2, equalIndex - 2) : arg.substr(2);

    if (!argSeparatorDetected) {
      if (arg === '--') {
        argSeparatorDetected = true;
      } else if (arg.indexOf('--') === 0 && result.options.hasOwnProperty(optName)) {
        const potentialValue = equalIndex !== -1 ? arg.substr(equalIndex + 1) : true;
        result.options[optName] = typeof result.options[optName] !== 'boolean' && typeof potentialValue === 'boolean' ? result.options[optName] : potentialValue;
      } else {
        result.tasks.push(arg);
      }
    } else {
      result.taskArgs.push(arg);
    }
  }

  return result;
};
