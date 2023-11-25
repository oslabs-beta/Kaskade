const fs = require('fs');
const configString = fs.readFileSync(process.argv[2])
const config = JSON.parse(configString);
console.log(config);

module.exports.testFunc = () => {
  console.log('I am from kaskade package')
}