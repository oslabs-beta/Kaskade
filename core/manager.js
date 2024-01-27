'use strict'

const runner =require('./runner');
const path = require('path');
const cliProgress = require('cli-progress');
const { Worker, isMainThread, parentPort, workerData} = require('node:worker_threads');

const printResults = require('./printResults');
const calculate = require('./calculate');

async function manager(opts){
  let final_result;
  const startTime = Date.now();

  const progressBar = new cliProgress.SingleBar({
    format: 'Progress [{bar}] {percentage}% | Elapsed: {duration}s',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  progressBar.start(opts.testDuration, 0);

  const progressInterval = setInterval(() => {
    progressBar.increment();
  }, 1000);

    if(opts.numOfWorkers === 1){
      const metricsArr = []
      for(let i = 0; i< opts.concurrentUsers; i++){
        metricsArr.push(runner(opts))
      }
      const result = await Promise.all(metricsArr);
      clearInterval(progressInterval);
      progressBar.stop(); 
      final_result = calculate(result, opts);
      console.log(printResults(final_result));
    }
  else {
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
    const result = await Promise.all(workerPromises);
    const final = result.flat();

    clearInterval(progressInterval);
    progressBar.stop();

    final_result = calculate(final, opts);
    console.log(printResults(final_result));
  } 

const endTime = Date.now(); 
const elapsedTime = (endTime - startTime) / 1000;
console.log(`Total elapsed time: ${elapsedTime.toFixed(2)} seconds`);

return final_result; 

}

module.exports = manager
