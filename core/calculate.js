const hdr = require('hdr-histogram-js')
const histUtil = require('hdr-histogram-percentiles-obj')
const Metrics = require("./metrics");

function calculate(metrics, config) {

//     received metrics example: an array of metrics object from each runner
//     [{latencyStats: {s0_r0: [2, 3, 2, 1], s0_r1: [1, 2, 2, 3], s0_r2: [2, 3, 2, 3]},
// errorStas:{s0_r0: {400: 3, 404: 4, 500: 5}, s0_r1: {400: 2, 404: 1, 500: 2}, s0_r2: {400: 2, 404: 3, 500: 2}}, 
// totalSuccessRequest: 500, totalBytes: 10,000 }, {}, {}, {} ]



// Aggregate all metrics into one metrics
const finalMetrics = new Metrics();
for (let i = 0; i < metrics.length; i++) {
    finalMetrics.aggregate(metrics[i]);
    // console.log("final", finalMetrics);
}

// calculate latency stats
for (let key in finalMetrics.latencyStats) {
    let histogram = hdr.build();
    for (let i = 0; i < finalMetrics.latencyStats[key].length; i++) {
        histogram.recordValue(finalMetrics.latencyStats[key][i]);
    }
//    console.log(key, histogram);
}

// calculate error stats

// calculate request throughput
let requestResult = finalMetrics.totalSuccessRequest / config.testDuration
// calculate bytes throughput
let bytesResult = finalMetrics.totalBytes / config.testDuration


}


// let metrics1 = new Metrics();
// metrics1.latencyStats["s0_r0"] = [2, 3, 2, 1];
// metrics1.latencyStats["s0_r1"] = [1, 2, 2, 3];
// metrics1.latencyStats["s0_r2"] = [2, 3, 2, 3];

// let metrics2 = new Metrics();
// metrics2.latencyStats["s0_r0"] = [20, 30, 20, 10];
// metrics2.latencyStats["s0_r1"] = [10, 20, 20, 30];
// metrics2.latencyStats["s0_r2"] = [20, 30, 20, 30];

// calculate([metrics1, metrics2]);

module.exports = calculate;