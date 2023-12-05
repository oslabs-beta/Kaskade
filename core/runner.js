const HttpClient = require("./httpClient");
const Metrics = require("./metrics");
const config = require("./../config/example.json")
// 1. create an httpClient
// 1.1. mark benchmark starting time
// 2. check if testDuration time is over
// 3. send one request
// 4. receive the response from httpClient, and save the information, pass to metrics
// 5. send to the next request


function runner(config, resultCb) {

    // create an httpClient
    const httpClient = new HttpClient(config);   

    // create a metrics collector
    const metrics = new Metrics();  

    // create the runner start time, for future use of check testDuration
    let runnerStartTime = Date.now();

    // create sessionId, start with 0
    // to-do: support multiple session for stretch feature
    let sessionId = 0; 

    // create requestId, start with 0
    let requestId = 0; 

    function selectRequest() {
        // 2. check if testDuration time is over
        const currentTime = Date.now();
        if (currentTime - runnerStartTime > config.testDuration * 1000) {
            // The benchmark completes
            // to-do: need to notify the main about the completion, and report metrics result.
            resultCb(metrics);
            return;
        }
        // 3. send one request
        metrics.beforeSendRequest(sessionId, requestId);
        httpClient.makeRequest(config.sessions[sessionId].requests[requestId], onResponse, onError);  
    }

    function onResponse(data) {
        // 4. receive the response from httpClient, and save the information, pass to metrics
        metrics.afterReceiveResponse(sessionId, requestId, data);
        // 5. send to the next request
        requestId ++;
        // check if this session ends; if so, start a new session
        if (requestId >= config.sessions[sessionId].requests.length) {
            requestId = 0;
            // to-do: support multiple sessions for stretch
        }
        selectRequest();
    }

    function onError(statusCode) {
        // receive the error status from httpClient, and save the information, pass to metrics
        metrics.afterReceiveError(sessionId, requestId, statusCode);
       // skip the current round following requests, and redo the next round of requests in this session
        requestId = 0;
        selectRequest();
    }
  
    // send the first request
    selectRequest();
}


// WENZHEN TEST RUNNER FUNCTION (SIMULATING ASYNC)
function runnerTest(opts, callback){
    const metrics = new Metrics(); 
    metrics.beforeSendRequest('testSessionId', 'testRequestId');
    
    // start simulating async axios requests
    const promiseA = new Promise((resolve, reject) => {
        let res = 0;
        for(let i = 0; i <= 10_000_000_000; i++){
              res += i;
        }
        resolve(res);
      });
    // async axios requests ends
    
    metrics.afterReceiveResponse('testSessionId', 'testRequestId') ;
    return metrics;
}
module.exports = runner;
