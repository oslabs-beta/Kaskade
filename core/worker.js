'use strict'

const runner =require('./runner')

const { Worker, threadId, isMainThread, parentPort, workerData } = require('node:worker_threads');
const opts = workerData;
if (!isMainThread) {  
  const metricsArr = []
  for(let i = 0; i< opts.concurrentUsers; i++){
    metricsArr.push(runner(opts))
  }
  Promise.all(metricsArr)
  .then(data => {
    parentPort.postMessage(data)
  });
}