const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./datafile.json'))
console.log(data[0])