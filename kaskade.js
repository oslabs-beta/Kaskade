'use strict'

const fs = require('fs');
const path = require('path');
const manager = require('./core/manager')

function init(configPath) {
  try{
    const configString = fs.readFileSync(configPath);
    const opts = JSON.parse(configString);
    return manager(opts, console.log);
  }
  catch(e){
    console.log(e)
  }
}
module.exports = init