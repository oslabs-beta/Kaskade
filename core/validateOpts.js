'use strict'

function validateOpts(opts){
  
  const required_opts_available = 
    (opts.servers !== undefined 
    && opts.testDuration !== undefined
    && opts.concurrentUsers !== undefined
    && opts.requests !== undefined &&
    opts.numOfWorkers !== undefined)
    if(required_opts_available){

    // helper functions
    const isValidUrl = urlString => {
      try { 
        return Boolean(new URL(urlString)); 
      }
      catch(e){ 
        return false; 
      }
    };
    const isValidRequest = request => {
      const {requestName, url, method, headers, body} = request;
      if(typeof request !== 'object' || Array.isArray(request)){
        // throw new Error('request is not an object');
        return false;
      }
      else{
        if(!requestName || !url || typeof requestName !== 'string' || url[0] !== '/'){
          throw new Error('Possible error: \n0.url missing\n1.requestName missing\n2.requestName is not a string\n3.invalid url');
        }
        else{
          if(method && method !== 'GET' && method !== 'POST' && method !== 'PATCH' && method !== 'DELETE' && method !== 'PUT'){
            throw new Error('invalid method');
          }
          else if(typeof headers !== 'object' || Array.isArray(headers)){
            throw new Error('headers is not an object');
          }
          else if(body && (typeof body !== 'object' || Array.isArray(body))){
            throw new Error('body is not an object');
          }
        }
        return true;
      }
    };
    
    // const isValidSession = session => {
    //   const { sessionName, requests } = session;
    //   if(!sessionName || !requests){
    //     throw new Error('sessionName or requests missing');
    //   }
    //   else{
    //     if(!Array.isArray(requests) || requests.length < 1 || typeof sessionName !== 'string'){
    //       throw new Error('Possible error: \n0.requests is not an array\n1.requests is an empty array\n2.sessionName is not a string');
    //     }
    //     else{
    //       return requests.every(request => {return isValidRequest(request)});
    //     }
    //   }
    // };
    
    let valid_servers = Array.isArray(opts.servers) && opts.servers.length >= 1 && opts.servers.every(url => isValidUrl(url));;
    let valid_testDuration = Number.isInteger(opts.testDuration) && opts.testDuration >= 1;
    let valid_concurrentUsers = Number.isInteger(opts.concurrentUsers) && opts.concurrentUsers >= 1;
    let valid_numOfWorkers = Number.isInteger(opts.numOfWorkers) && opts.numOfWorkers >= 1;
    let valid_requests = Array.isArray(opts.requests) && opts.requests.length >= 1 && opts.requests.every(request => isValidRequest(request));

    if(!valid_servers){
      throw new Error('Invalid servers under config file');
    }
    else if(!valid_testDuration){
      throw new Error('Invalid testDuration under config file, testDuration should be a positive integer');
    }
    else if(!valid_concurrentUsers){
      throw new Error('Invalid concurrentUsers under config file, concurrentUsers should be a positive integer');
    }
    else if(!valid_numOfWorkers){
      throw new Error('Invalid numOfWorkers under config file, numOfWorkers should be a positive integer');
    }
    else if(!valid_requests){
      throw new Error('Invalid requests under config file, ');
    }
    else{
      return true;
    }
  }

  else{
    throw new Error('Required field(s) missing')
  }
  

}
module.exports = validateOpts