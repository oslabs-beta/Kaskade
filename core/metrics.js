class Metrics {

    constructor() {
        this.startTime = null;
        // key: sessionId + requestId; value: an array of latency
        this.latencyStats = {};
    }

    // get the key for latencyStats
    getKey(sessionId, requestId) {
        return sessionId + "_" + requestId;
    }

    // called before runner send out a request, mark the start time
    beforeSendRequest(sessionId, requestId) {
        this.startTime = Date.now();
    }

    // called after runner received a response, measure the latency
    afterReceiveResponse(sessionId, requestId) {
        let requestLatency = Date.now() - this.startTime;
        let key = getKey(sessionId, requestId);

        if (!key in this.latencyStats) {
            this.latencyStats[key] = [];
        }
        this.latencyStats[key].push(requestLatency);

    }
}

module.exports = Metrics;
