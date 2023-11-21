'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000/api/getallusers',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)

// async/await
async function foo () {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 10, //default
    pipelining: 1, // default
    duration: 10 // default
  })
  console.log(result)
}