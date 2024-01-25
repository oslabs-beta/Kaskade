const path = require('path')
const kaskade = require('../kaskade.js');

process.parentPort.once('message', (m) => {
  console.log('册那')
  // kaskade(path.resolve(__dirname, '../config/example2.json'))
});