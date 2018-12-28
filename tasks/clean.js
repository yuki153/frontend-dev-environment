const del = require('del')
let { getPaths } = require('./config')

/**
 * 出力先のディレクトリを空にする
 */
function clean(done) {
  const paths = getPaths(this);
  del([paths.project.release]);
  done();
}

module.exports = clean
