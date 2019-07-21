const del = require('del')
let { getPaths } = require('./config')

/**
 * 出力先のディレクトリを空にする
 */
function clean() {
  const paths = getPaths(this);
  return del([paths.project.release]);
}

module.exports = clean
