'use strict'

const http = require('http');

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
        onError(error)
      }
      
      if ('content-length' in res.headers) {
        responseBytes = parseInt(res.headers['content-length'], 10);
        onResponse(responseBytes);
      }
    });
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  };
};


module.exports = HttpClient;
