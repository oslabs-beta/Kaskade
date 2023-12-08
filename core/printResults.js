'use strict'

// require cli-table3 to create table in console
const Table = require('cli-table3');
const prettierBytes = require('prettier-bytes');

const printResults = ({latencyStats, averagRequestThroughput, averageByteThroughput, requestThroughputStats, byteThroughputStats}) => {

  let strResult =''


  const logToLocalStr = (msg) => {
    strResult += msg +'\n';
  }

  const latencyTable = new Table({
    // headings for table
    head: ['Stat', '2.5%', '50%', '97.5%', '99%', 'Avg', 'Stdev', 'Max'],
    style: {
      //dsiable colors for head
      head: [],
      //dsiable colors for border
      border: []
    }    
  })

  for (let session in latencyStats){
    // add the data into rows for the table
      latencyTable.push(
        // req/sec data formatted to follow table head
        ['Latency: ' + session, `${latencyStats[session]['p2_5']} ms`, `${latencyStats[session]['p50']} ms`, `${latencyStats[session]['p97_5']} ms`,
        `${latencyStats[session]['p99']} ms`, `${latencyStats[session]['average']} ms`, `${latencyStats[session]['stddev']} ms`, 
        `${latencyStats[session]['max']} ms`],
      )}

  logToLocalStr(latencyTable.toString())


  // create new table of request throughput data
  const requestThroughputTable = new Table({
    // headings for table
    head: ['Stat', '1%', '2.5%', '50%', '97.5%', 'Avg', 'Stdev', 'Min'],
    style: {
      //dsiable colors for head
      head: [],
      //dsiable colors for border
      border: []
    }
  })

    // add the data into rows for the table
      requestThroughputTable.push(
        // req/sec data formatted to follow table head
        ['Request Throughput', `${requestThroughputStats['p1']} req/s`, `${requestThroughputStats['p2_5']} req/s`, `${requestThroughputStats['p50']} req/s`,
        `${requestThroughputStats['p97_5']} req/s`, `${requestThroughputStats['average']} req/s`, `${requestThroughputStats['stddev']} req/s`, 
        `${requestThroughputStats['min']} req/s`],
      )
    
    logToLocalStr(requestThroughputTable.toString())


  // create new table of byte throughput data
  const byteThroughputTable = new Table({
    // headings for table
    head: ['Stat', '1%', '2.5%', '50%', '97.5%', 'Avg', 'Stdev', 'Min'],
    style: {
      //dsiable colors for head
      head: [],
      //dsiable colors for border
      border: []
    }
  })

    // add the data into rows for the table
      byteThroughputTable.push(
        // req/sec data formatted to follow table head
        ['Bytes Throughput', `${prettierBytes(byteThroughputStats['p1'])}/s`, `${prettierBytes(byteThroughputStats['p2_5'])}/s`, `${prettierBytes(byteThroughputStats['p50'])}/s`,
        `${prettierBytes(byteThroughputStats['p97_5'])}/s`, `${prettierBytes(byteThroughputStats['average'])}/s`, `${prettierBytes(byteThroughputStats['stddev'])}/s`, 
        `${prettierBytes(byteThroughputStats['min'])}/s`],
      )
    
    logToLocalStr(byteThroughputTable.toString())

    return strResult
}


// uncomment code below to test
console.log(printResults({
  latencyStats: {
    s0_r0: {
      average: 11,
      mean: 11,
      stddev: 10.31,
      min: 1,
      max: 30,
      total: 8,
      p0_001: 1,
      p0_01: 1,
      p0_1: 1,
      p1: 1,
      p2_5: 1,
      p10: 1,
      p25: 2,
      p50: 3,
      p75: 20,
      p90: 30,
      p97_5: 30,
      p99: 30,
      p99_9: 30,
      p99_99: 30,
      p99_999: 30
    },
    s0_r1: {
      average: 11,
      mean: 11,
      stddev: 10.31,
      min: 1,
      max: 30,
      total: 8,
      p0_001: 1,
      p0_01: 1,
      p0_1: 1,
      p1: 1,
      p2_5: 1,
      p10: 1,
      p25: 2,
      p50: 3,
      p75: 20,
      p90: 30,
      p97_5: 30,
      p99: 30,
      p99_9: 30,
      p99_99: 30,
      p99_999: 30
    },
    s0_r2: {
      average: 13.75,
      mean: 13.75,
      stddev: 11.8,
      min: 2,
      max: 30,
      total: 8,
      p0_001: 2,
      p0_01: 2,
      p0_1: 2,
      p1: 2,
      p2_5: 2,
      p10: 2,
      p25: 2,
      p50: 3,
      p75: 20,
      p90: 30,
      p97_5: 30,
      p99: 30,
      p99_9: 30,
      p99_99: 30,
      p99_999: 30
    }
  },
  averagRequestThroughput: 2.4,
  averageByteThroughput: 36,
  requestThroughputStats: {
    average: 2.4,
    mean: 2.4,
    stddev: 2.16,
    min: 1,
    max: 8,
    total: 10,
    p0_001: 0,
    p0_01: 0,
    p0_1: 0,
    p1: 0,
    p2_5: 0,
    p10: 0,
    p25: 1,
    p50: 2,
    p75: 3,
    p90: 4,
    p97_5: 8,
    p99: 8,
    p99_9: 8,
    p99_99: 8,
    p99_999: 8
  },
  byteThroughputStats: {
    average: 36,
    mean: 36,
    stddev: 27.28,
    min: 10,
    max: 90,
    total: 10,
    p0_001: 0,
    p0_01: 0,
    p0_1: 0,
    p1: 0,
    p2_5: 0,
    p10: 0,
    p25: 20,
    p50: 30,
    p75: 40,
    p90: 80,
    p97_5: 90,
    p99: 90,
    p99_9: 90,
    p99_99: 90,
    p99_999: 90
  }
}));

// export the module
module.exports = printResults;