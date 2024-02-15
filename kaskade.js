'use strict'

const fs = require('fs');
const path = require('path');
const manager = require('./core/manager');
const validateOpts = require('./core/validateOpts');

function init(configPath) {
  try{
    const configString = fs.readFileSync(configPath);
    const opts = JSON.parse(configString);
    if(validateOpts(opts)){
      return manager(opts);
    }
  }
  catch(e){
    console.log(e)
  }
}
module.exports = init