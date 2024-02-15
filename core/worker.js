'use strict'

const runner =require('./runner')

const { Worker, threadId, isMainThread, parentPort, workerData } = require('node:worker_threads');
const opts = workerData;
// console.log('Worker', threadId, 'is processing', opts.concurrentUsersforworker, 'users\' requests');
if (!isMainThread) {  
  const metricsArr = []
  for(let i = 0; i< opts.concurrentUsersforworker; i++){
    metricsArr.push(runner(opts))
  }
  Promise.all(metricsArr)
  .then(data => {
    parentPort.postMessage(data)
  });
}