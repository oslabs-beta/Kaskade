'use strict'

const runner =require('./runner');
const path = require('path');
const { Worker, isMainThread, parentPort, workerData} = require('node:worker_threads');

const printResults = require('./printResults');
const calculate = require('./calculate');

async function manager(opts){
  

  if(opts.numOfWorkers === 1){
    const metricsArr = []
    for(let i = 0; i< opts.concurrentUsers; i++){
      metricsArr.push(runner(opts))
    }
    const result = await Promise.all(metricsArr);
    console.log(printResults(calculate(result, opts)));
  }
  else{
    const workerPromises = [];

    let concurrentUsersArr = Array(opts.numOfWorkers).fill(Math.floor(opts.concurrentUsers/opts.numOfWorkers));
    let mod = opts.concurrentUsers % opts.numOfWorkers;
    for(let i = 0; i < mod; i++){
      concurrentUsersArr[i]++
    }

    for(let i = 0; i < opts.numOfWorkers; i++){
      opts.concurrentUsersforworker = concurrentUsersArr[i];
      workerPromises.push(new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, './worker.js'), {workerData: opts});
        worker.on('message', msg => {
          resolve(msg);
        })
      })) 
    }
    const result = await Promise.all(workerPromises)
    const final = result.flat()
    console.log(printResults(calculate(final, opts)));

  }
}

module.exports = manager