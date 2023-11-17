const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,

})
module.exports = {
  query: (text, params, callback) => {
    console.log('EXECUTED QUERY', text);
    return pool.query(text, params, callback);
  }
};