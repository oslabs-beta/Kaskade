'use strict'

const fs = require('fs');
const path = require('path');
const manager = require('./core/manager');
const validateOpts = require('./core/validateOpts');

// async function init(configPath) {
async function init(opts) {
  console.log("opts in kaskade.js", opts)
  
  // const opts_hardcoded = {

  //   servers: ["localhost:3000"],
  //   testDuration: 10,
  //   concurrentUsers: 100,
  //   targetThroughput: 1000,
  //   numOfWorkers:100,
  //   requests: [
  //     {
  //         "requestName": "Get all users",
  //         "url": "/api/getallusers",
  //         "method": "GET",
  //         "headers": {
  //             "Content-type": "application/json"
  //         }
  //     }
  //   ],
  // }
  try{
    // const configString = fs.readFileSync(configPath);
    // const opts = JSON.parse(configString);
    if(validateOpts(opts)){
      let final_data = await manager(opts)
      return final_data;
    }
  }
  catch(e){
    console.log(e)
  }
}
module.exports = init