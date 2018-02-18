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
