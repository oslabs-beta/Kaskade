// require cli-table3 to create table in console
const Table = require('cli-table3');


const printResults = () => {

  let strResult =''


  const logToLocalStr = (msg) => {
    strResult += msg +'\n';
  }

  const latencyTable = new Table({
    // headings for table
    head: ['Stat', '1%', '2.5%', '50%', '97.5%', 'Avg', 'Stdev', 'Max'],
    style: {
      //dsiable colors for head
      head: [],
      //dsiable colors for border
      border: []
    }    
  })

  // add the data into rows for the table
  latencyTable.push(
    // req/sec data formatted to follow table head
    ['latency', 'test', 'test', 'test', 'test', 'test', 'test', 'test'],
  )

  logToLocalStr(latencyTable.toString())


  // create new table of request data
  const requestsTable = new Table({
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
    requestsTable.push(
      // req/sec data formatted to follow table head
      ['req/sec', 'test', 'test', 'test', 'test', 'test', 'test', 'test'],
      // bytes/sec data formatted to follow table head
      ['bytes/sec', 'test', 'test', 'test', 'test', 'test', 'test', 'test'],
    )

    logToLocalStr(requestsTable.toString())

    return strResult
}


// uncomment code below to test
console.log(printResults());

// export the module
module.exports = printResults;