'use strict'

function validateOpts(opts){
  
  const required_opts_available = 
    (opts.servers !== undefined 
    && opts.testDuration !== undefined
    && opts.concurrentUsers !== undefined
    && opts.sessions !== undefined);
  
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
        console.log('RETURING FLASE')

        return false
      }
      else{
         if(!requestName || typeof requestName !== 'string' || isValidRequest(url)){
          
          return false;
         }
         else{
          if(method && (method !== 'GET' || method !== 'POST' || method !== 'PATCH' || method !== 'DELETE' || method !== 'PUT')){
            return false;
          }
          else if(typeof headers !== 'object' || Array.isArray(headers)){
            return false;
          }
          else if(typeof body !== 'object' || Array.isArray(body)){
            return false;
          }
         }
         return true;
      }
    };

    const isValidSession = session => {
      const { sessionName, requests } = session;
      console.log('this is REQUESTS: ', requests)

      if(!sessionName || !requests){
        return false;
      }
      else{
        if(!Array.isArray(requests) || requests.length < 1 || typeof sessionName !== 'string'){
          return false;
        }
        else{
          return requests.every(request => {return isValidRequest(request)});
        }
      }
    };
    let valid_servers = Array.isArray(opts.servers) && opts.servers.length >= 1 && opts.servers.every(url => isValidUrl(url));;
    let valid_testDuration = Number.isInteger(opts.testDuration) && opts.testDuration >= 1;
    let valid_concurrentUsers = Number.isInteger(opts.concurrentUsers) && opts.concurrentUsers >= 1;

    let valid_sessions = Array.isArray(opts.sessions) && opts.sessions.length >= 1 && opts.sessions.every(session => isValidSession(session));

    if(!valid_servers){
      throw new Error('Invalid servers under config file');
    }
    else if(!valid_testDuration){
      throw new Error('Invalid testDuration under config file, testDuration should be a positive integer');
    }
    else if(!valid_concurrentUsers){
      throw new Error('Invalid concurrentUsers under config file, concurrentUsers should be a positive integer');
    }
    else if(!valid_sessions){
      throw new Error('Invalid sessions under config file, ');
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