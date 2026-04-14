let logs = []; // 🧠 store logs in memory

function addLog(entry) {
    const log = {
        time: new Date().toLocaleTimeString(),
        ...entry
    };

    logs.unshift(log); // latest on top

    // limit logs
    if (logs.length > 50) logs.pop();
}

// WRITE LOG
function logWriteOperation(key, path, stashSize) {
    addLog({
        type: "WRITE",
        key,
        message: `Path: ${path}`,
        stash: stashSize
    });
}

// READ LOG
function logReadOperation(key, path, result, stashSize) {
    addLog({
        type: "READ",
        key,
        message: `Path: ${path}`,
        result,
        stash: stashSize
    });
}

// GET LOGS
function getLogs() {
    return logs;
}

module.exports = {
    logWriteOperation,
    logReadOperation,
    getLogs
};