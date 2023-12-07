'use strict'

const http = require('http');

//test example of direct access to entire config file
// const config = require("./../config/example.json");

// const passedInFormat = {
//   requestName: 'get all art',
//   url: '/api/users/login',
//   method: 'POST',
//   headers: { 'Content-type': 'application/json' },
//   body: { 
//     "username": "Michael",
//     "password": "Mann"
// }
// }

// const passedInFormat = config.sessions[0].requests[0]
// console.log("passedInFormat: ", passedInFormat)

// for Michael: request options needs to be in this format for http.request to work
// const requestOptions = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/art/fetchArt/sad',
//   method: 'GET',
//   headers: {
//     'Content-type': 'application/json',
//   },
//   body: { 
//     firstName: "Michael",
//     lastName: "Mann"
//   },
// };

class HttpClient {
  constructor(config) {
    const serverString = config.servers[0];

    const [hostname, port] = serverString.split(':');

    this.hostname = hostname;
    this.port = parseInt(port, 10);
  }

  makeRequest(options, onResponse, onError) {
    const req = http.request(
      {
        hostname: this.hostname,
        port: this.port,
        path: options.url,
        method: options.method,
        headers: options.headers,
      }, (res) => {
      let responseBytes = null;
      
      
      if (res.statusCode !== 200){
        const error = res.statusCode;
        // console.log("error:", error);
        onError(error)
      }
      
      // Check if Content-Length is present in headers
      if ('content-length' in res.headers) {
        responseBytes = parseInt(res.headers['content-length'], 10);
        //invoking onResponse with the amount of response bytes
        onResponse(responseBytes);
      }
    });
    
    // If there is a request body, write it to the request
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();  //here is where the actual request is done being written and sent to the server
  };
};


// just made for Michael Mann testing
// const httpClient = new HttpClient(config)

// httpClient.makeRequest(passedInFormat, onResponseCallback, onErrorCallback);

// function onResponseCallback(response) {
//   console.log("Response received:", response);
// }

// function onErrorCallback(error) {
//   console.error("Error occurred:", error);
// }

module.exports = HttpClient;
