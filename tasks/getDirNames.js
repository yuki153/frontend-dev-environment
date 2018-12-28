const fs = require('fs')
const files = fs.readdirSync('./src/');
const regExp = /^\./;
if (regExp.test(files[0])) files.shift();
module.exports = files;
