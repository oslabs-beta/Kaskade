const path = require('path')
const kaskade = require('../kaskade.js');

process.parentPort.on('message', async (e) => {
  console.log(e.data)
  const data = await kaskade(path.resolve(__dirname, '../config/example2.json'))
  process.parentPort.postMessage(data)
});