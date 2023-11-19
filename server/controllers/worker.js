const { parentPort } = require('worker_threads');
const db = require('../models/soloProjectModels');

const findAllUsers = `SELECT * FROM users`;
db.query(findAllUsers)
.then(data => {
  parentPort.postMessage(data.rows);
})