'use strict'

// require in hdr histogram and utilities
const hdr = require('hdr-histogram-js')
const histUtil = require('hdr-histogram-percentiles-obj')
const Metrics = require("./metrics");

const createHistogram = (data) => {

  const histogram = hdr.build({ useWebAssembly: true });

  data.forEach((value) => {
    histogram.recordValue(value)
  })

  // below code adds additional percentiles to the returned statistics object
  const resultWithPercentiles = histUtil.addPercentiles(histogram, histUtil.histAsObj(histogram, histogram.totalCount))
  // console.log(resultWithPercentiles)

  // free up memory once histogram is no longer needed
  histogram.destroy();
  return resultWithPercentiles;
}

function calculate(metrics, config) {
  hdr.initWebAssemblySync();

  // Aggregate all metrics into one metrics
  const finalMetrics = new Metrics();
  for (let i = 0; i < metrics.length; i++) {
    finalMetrics.aggregate(metrics[i]);
    // console.log("final", finalMetrics);
  }

  // calculate latency stats
  const latencyStats = {};
  for (let key in finalMetrics.latencyStats) {
    latencyStats[key] = createHistogram(finalMetrics.latencyStats[key]);
  }

  // calculate error stats



  // calculate request throughput
  const averagRequestThroughput = finalMetrics.totalSuccessRequest / config.testDuration;
  // console.log("Average request throughput: ", averagRequestThroughput);

  // calculate bytes throughput
  const averageByteThroughput = finalMetrics.totalBytes / config.testDuration;
  // console.log("Average byte throughput: ", averageByteThroughput);
   const requestThroughputStats = {};
  for (let key in finalMetrics.successRequestInEachSecond) {
    requestThroughputStats[key] = createHistogram(finalMetrics.successRequestInEachSecond[key]);
  }
  // console.log(requestThroughputStats);
  const byteThroughputStats = {};
  for (let key in finalMetrics.bytesInEachSecond) {
    byteThroughputStats[key] = createHistogram(finalMetrics.bytesInEachSecond[key]);
  }
  // console.log(byteThroughputStats);

  return {latencyStats, averagRequestThroughput, averageByteThroughput, requestThroughputStats, byteThroughputStats}
}

// --------------------- test --------------------------
let metrics1 = new Metrics();
metrics1.latencyStats["s0_r0"] = [2, 3, 2, 1];
metrics1.latencyStats["s0_r1"] = [1, 2, 2, 3];
metrics1.latencyStats["s0_r2"] = [2, 3, 2, 3];
metrics1.totalSuccessRequest = 12
metrics1.totalBytes = 150;
metrics1.successRequestInEachSecond["s0_r0"] = [1, 0, 5, 0, 0, 1, 1, 1, 3, 0];
metrics1.successRequestInEachSecond["s0_r1"] = [2, 0, 2, 1, 0, 3, 1, 0, 4, 0];
metrics1.successRequestInEachSecond["s0_r2"] = [3, 1, 1, 0, 0, 2, 0, 1, 2, 1];
metrics1.bytesInEachSecond["s0_r0"] = [30, 0, 50, 0, 0, 10, 20, 10, 30, 0];
metrics1.bytesInEachSecond["s0_r1"] = [50, 10, 50, 3, 20, 40, 12, 16, 0, 0];
metrics1.bytesInEachSecond["s0_r2"] = [10, 6, 14, 15, 25, 10, 8, 30, 12, 5];

let metrics2 = new Metrics();
metrics2.latencyStats["s0_r0"] = [20, 30, 20, 10];
metrics2.latencyStats["s0_r1"] = [10, 20, 20, 30];
metrics2.latencyStats["s0_r2"] = [20, 30, 20, 30];
metrics2.totalSuccessRequest = 12
metrics2.totalBytes = 210;
metrics2.successRequestInEachSecond["s0_r0"] = [1, 1, 3, 1, 0, 2, 0, 1, 1, 2];
metrics2.successRequestInEachSecond["s0_r1"] = [1, 0, 2, 0, 3, 5, 2, 1, 0, 0];
metrics2.successRequestInEachSecond["s0_r2"] = [3, 2, 4, 1, 1, 2, 6, 0, 4, 2];
metrics2.bytesInEachSecond["s0_r0"] = [60, 0, 30, 10, 0, 20, 0, 10, 10, 40];
metrics2.bytesInEachSecond["s0_r1"] = [34, 21, 8, 0, 14, 64, 8, 21, 0, 4];
metrics2.bytesInEachSecond["s0_r2"] = [25, 64, 20, 31, 20, 42, 12, 14, 0, 12];

console.log(calculate([metrics1, metrics2], {testDuration: 10}));



module.exports = calculate;