'use strict'

const runner =require('./runner')

const { Worker, threadId, isMainThread, parentPort, workerData } = require('node:worker_threads');
const opts = workerData;
if (!isMainThread) {
  parentPort.postMessage(runner(opts))
}