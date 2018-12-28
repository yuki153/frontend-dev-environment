const dirNames = require('./getDirNames');
const reset = '\u001b[0m';
const cyan = '\u001b[36m';
const red  = '\u001b[31m';
let dirName = '';

if (process.argv[3] && dirNames.indexOf(process.argv[3].slice(2)) >= 0) {
  dirName = process.argv[3].slice(2);

} else if (process.argv[3] && dirNames.indexOf(process.argv[3].slice(1)) >= 0) {
  const str = process.argv[3].slice(1)
  console.log(`${red}ERROR::${cyan}(BAD)'gulp select -${str}' (GOOD)'gulp select --${str}'${reset}`);
  process.exit(1)

} else if (process.argv[3] && dirNames.indexOf(process.argv[3]) >= 0) {
  const str = process.argv[3];
  console.log(`${red}ERROR::${cyan}(BAD)'gulp select ${str}' (GOOD)'gulp select --${str}'${reset}`);
  process.exit(1)

} else if (process.argv[3]) {
  console.log(`${red}ERROR::${cyan}「${process.argv[3].slice(2)}」というディレクトリーは存在していません${reset}`);
  process.exit(1)

} else if (process.argv[2] === 'select') {
  console.log(`${red}ERROR::${cyan}ディレクトリー名の指定が必要です。(BAD)'gulp select' (GOOD)'gulp select --hoge'${reset}`);
  process.exit(1)
}
module.exports = dirName;
