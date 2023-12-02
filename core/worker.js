const runner =require('@panda-whale-ptri12/kaskade/core/runner')

const { Worker, threadId, isMainThread, parentPort, workerData } = require('node:worker_threads');
const opts = workerData;
if (!isMainThread) {
  parentPort.postMessage(runner(opts))
}