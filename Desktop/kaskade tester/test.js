// test.js
const kaskade = require('@panda-whale-ptri12/kaskade');
const path = require('path');

const configPath = path.resolve(__dirname, 'aws-test.json');

kaskade(configPath);
