let output = {};
let chalk;
try { chalk = require('chalk'); } catch (e) { }

const message = (m, color) => {
  console.log(color && chalk && chalk.keyword(color) ? chalk.keyword(color)(m) : m);
}

const reporter = (id, parallel, reportFunction, message) => {
  if (parallel) {
    const a = output[id] || [];
    a.push(message);
    output[id] = a;
  } else {
    reportFunction(message);
  }
}

const printOutput = (id, reportFunction) => {
  const a = output[id] || [];
  a.forEach((m) => reportFunction(m));
  delete output[id];
}

const calculateDuration = (start) => {
  const duration = Date.now() - start;
  let seconds = duration / 1000;
  let minutes = Math.floor(duration / 1000 / 60);
  const hours = Math.floor(duration / 1000 / 60 / 60);

  if (seconds >= 60) {
    if (minutes >= 60) {
      minutes = Math.floor(minutes - hours * 60);
      seconds = (seconds - hours * 60 * 60 - minutes * 60).toFixed(2);
      return `${hours} hrs ${minutes} min ${seconds} sec`;
    } else {
      seconds = (seconds - minutes * 60).toFixed(2);
      return `${minutes} min ${seconds} sec`;
    }
  } else {
    return `${seconds.toFixed(2)} sec`;
  }
}

module.exports = {
  message: message,
  reporter: reporter,
  printOutput: printOutput,
  calculateDuration: calculateDuration
}
