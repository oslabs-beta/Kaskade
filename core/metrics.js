'use strict'

class Metrics {

    constructor() {
        //------------- the following are temp data -------------
        // the start time of this runner
        this.benchmarkStartTime = Date.now();

        // the start time of current request
        this.requestStartTime = null;

        //------------- the following are metrics data -------------
        // key: sessionId + requestId; value: an array of latency
        // example: {s0_r0: [2, 3, 2, 1], s0_r1: [1, 2, 2, 3], s0_r2: [2, 3, 2, 3]}
        this.latencyStats = {};

        // key: sessionId + requestId; value: an object with key: status code, value: the time this staus occurs
        // example: {s0_r0: {400: 3, 404: 4, 500: 5}, s0_r1: {400: 2, 404: 1, 500: 2}, s0_r2: {400: 2, 404: 3, 500: 2}}
        this.errorStats = {};

        // the total count of success request, use to calculate the request per second throughput
        this.totalSuccessRequest = 0;

        // the number of success requests received in each second of the benchmark

        // key: sessionId +requestId; value: an array of counter.
        // example: {s0_r0: [0, 1, 2, 1], s0_r1: [1, 1, 2, 1], s0_r2: [2, 1, 0, 2]}
        this.successRequestInEachSecond = {};

        // the total number of bytes used to calculate bytes per second throughput
        this.totalBytes = 0;

        // the number of bytes received in each second of the benchmark
        // key: sessionId +requestId; value:an array of counter.
        // example: {s0_r0: [20, 16, 20, 10], s0_r1: [15, 15, 20, 42], s0_r2: [28, 10, 40, 25]}
        this.bytesInEachSecond = {};

    }

    // get the key for latencyStats
    getKey(sessionId, requestId) {
        return "s" + sessionId + "_" + "r" + requestId;
    }

    // called before runner send out a request, mark the start time
    beforeSendRequest(sessionId, requestId) {
        this.requestStartTime = Date.now();
    }

    // called after runner received a response, measure the latency

    afterReceiveResponse(sessionId, requestId, size) {
        let requestLatency = Date.now() - this.requestStartTime;
        let key = this.getKey(sessionId, requestId);

        if (!(key in this.latencyStats)) {
            this.latencyStats[key] = [];
        }
        this.latencyStats[key].push(requestLatency);
        this.totalSuccessRequest++;
        this.totalBytes += size;

        let currentTime = Date.now();
        let currentSec = Math.floor((currentTime - this.benchmarkStartTime) / 1000);

        if (!(key in this.successRequestInEachSecond)) {
            this.successRequestInEachSecond[key] = [];
            this.bytesInEachSecond[key] = [];
        }
        while (this.successRequestInEachSecond[key].length <= currentSec) {
            this.successRequestInEachSecond[key].push(0);
            this.bytesInEachSecond[key].push(0);
        }

        this.successRequestInEachSecond[key][currentSec]++;
        this.bytesInEachSecond[key][currentSec] += size;
    }


    // called after runner received an error, save the erro info

    afterReceiveError(sessionId, requestId, statusCode) {
        let key = this.getKey(sessionId, requestId);

        if (!(key in this.errorStats)) {
            this.errorStats[key] = {};
            this.errorStats[key][statusCode] = 1;
        } else {
            if (!statusCode in this.errorStats[key]) {
                this.errorStats[key][statusCode] = 1;   
            } else {
                this.errorStats[key][statusCode]++;   
            }
        }
       

    }

    // aggregate other metrics onto this metrics
    aggregate(otherMetrics) {
        this.totalBytes += otherMetrics.totalBytes;
        this.totalSuccessRequest += otherMetrics.totalSuccessRequest;
        // latency stats
        for (let key in otherMetrics.latencyStats) {
            if (key in this.latencyStats) {
                this.latencyStats[key] = this.latencyStats[key].concat(otherMetrics.latencyStats[key]);
            } else {
                this.latencyStats[key] = otherMetrics.latencyStats[key];
            }
        }
        // error stats
        for (let key in otherMetrics.errorStats) {
            if (key in this.errorStats) {
                for (let statusCode in otherMetrics.errorStats[key]) {
                    if (statusCode in this.errorStats[key]) {
                        this.errorStats[key][statusCode] += otherMetrics.errorStats[key][statusCode];
                    } else {
                        this.errorStats[key][statusCode] = otherMetrics.errorStats[key][statusCode];
                    }
                }
            } else {
                this.errorStats[key] = otherMetrics.errorStats[key];
            }
        }
        // successRequestInEachSecond
        for (let key in otherMetrics.successRequestInEachSecond) {
            if (key in this.successRequestInEachSecond) {
                for (let i = 0; i < otherMetrics.successRequestInEachSecond[key].length; i++) {
                    if (this.successRequestInEachSecond[key].length <= i) {
                        this.successRequestInEachSecond[key].push(0);
                    }
                    this.successRequestInEachSecond[key][i] += otherMetrics.successRequestInEachSecond[key][i];
                }
            } else {
                this.successRequestInEachSecond[key] = [...otherMetrics.successRequestInEachSecond[key]];
            }
        }
        // bytesInEachSecond
        for (let key in otherMetrics.bytesInEachSecond) {
            if (key in this.bytesInEachSecond) {
                for (let i = 0; i < otherMetrics.bytesInEachSecond[key].length; i++) {
                    if (this.bytesInEachSecond[key].length <= i) {
                        this.bytesInEachSecond[key].push(0);
                    }
                    this.bytesInEachSecond[key][i] += otherMetrics.bytesInEachSecond[key][i];
                }
            } else {
                this.bytesInEachSecond[key] = [...otherMetrics.bytesInEachSecond[key]];
            }
        }
    }
}

module.exports = Metrics;
