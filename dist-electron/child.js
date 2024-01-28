const path = require('path')
const kaskade = require('../kaskade.js');

process.parentPort.on('message', async (opts) => {
  const data = await kaskade(opts.data)
  process.parentPort.postMessage(data)
});