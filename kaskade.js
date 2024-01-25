'use strict'

const fs = require('fs');
const path = require('path');
const manager = require('./core/manager');
const validateOpts = require('./core/validateOpts');

async function init(configPath) {
  try{
    const configString = fs.readFileSync(configPath);
    const opts = JSON.parse(configString);
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