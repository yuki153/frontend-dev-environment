const browserSync = require('browser-sync');
const isNeeded = !!require('./getArgument');

const server = browserSync.create()
const option = {
  server: {
    baseDir: './release',
    directory: true,
    index: "index.html"
  },
  open: true,
  port: 8888,
}

const serveIfNeeded = (done) => {
  if (isNeeded) {
    server.init(option);
  }
  done();
}

const reload = (done) => {
  server.reload();
  done();
}

const serve = (done) => {
  server.init(option);
  done();
}

module.exports = { serveIfNeeded, reload, serve }
