class Metrics {

    constructor() {
        this.startTime = null;
        // key: sessionId + requestId; value: an array of latency
        // example: {s0_r0: [2, 3, 2, 1], s0_r1: [1, 2, 2, 3], s0_r2: [2, 3, 2, 3]}
        this.latencyStats = {};

        // key: sessionId + requestId; value: an object with key: status code, value: the time this staus occurs
        // example: {s0_r0: {400: 3, 404: 4, 500: 5}, s0_r1: {400: 2, 404: 1, 500: 2}, s0_r2: {400: 2, 404: 3, 500: 2}}
        this.errorStats = {};

        // the total count of success request, use to calculate the request per second throughput
        // in manager.js, sum up the totalSuccess of all connections, then divide by the testDuration time
        this.totalSuccessRequest = 0;
        this.totalBytes = 0;

    }

    // get the key for latencyStats
    getKey(sessionId, requestId) {
        return "s" + sessionId + "_" + "r" + requestId;
    }

    // called before runner send out a request, mark the start time
    beforeSendRequest(sessionId, requestId) {
        this.startTime = Date.now();
    }

    // called after runner received a response, measure the latency

    afterReceiveResponse(sessionId, requestId, size) {
        let requestLatency = Date.now() - this.startTime;
        let key = this.getKey(sessionId, requestId);

        if (!key in this.latencyStats) {
            this.latencyStats[key] = [];
        }
        this.latencyStats[key].push(requestLatency);
        this.totalSuccessRequest++;
        this.totalBytes += size;
    }


    // called after runner received an error, save the erro info

    afterReceiveError(sessionId, requestId, statusCode) {
        let key = this.getKey(sessionId, requestId);

        if (!key in this.errorStats) {
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

    aggregate(otherMetrics) {
        this.totalBytes += otherMetrics.totalBytes;
        this.totalSuccessRequest += otherMetrics.totalSuccessRequest;
        // latency stats
        for (let key in otherMetrics.latencyStats) {
            if (key in  this.latencyStats) {
                this.latencyStats[key] = this.latencyStats[key].concat(otherMetrics.latencyStats[key]);
            } else {
                this.latencyStats[key] = otherMetrics.latencyStats[key];
            }
        }
        // error stats
        for (let key in otherMetrics.errorStats) {
            if (key in  this.errorStats) {
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
    }
}

module.exports = Metrics;
