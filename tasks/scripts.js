const gulp = require("gulp");
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const { getPaths, option } = require('./config');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const filteringEmptyFile = (paths) => {
  let entryFiles = {};
  let destIgnoredFiles = [];
  let jsFileCount = 0;

  const pathsLen = paths.scripts.webpack.length; // ２(PC path / SP path)
  for (let i = 0; i < pathsLen; i++) {
    let jsFiles = [];
    glob.sync(`./${paths.scripts.webpack[i]}`).map(jsFilePath => {
      jsFiles.push(jsFilePath);
      jsFileCount += 1;
    });
    for (const jsFile of jsFiles) {
      try {
        const data = fs.readFileSync(jsFile, 'UTF-8')
        // jsFile の中身が empty 尚且つ polyfill と名の付くファイルではない時 entryFiles に追加
        if (data.length && /[a-z]/.test(data) && !/polyfill/.test(jsFile)) {
          const key = path.basename(jsFile, path.extname(jsFile));
          if (i === 0) {
            entryFiles[`pc/${key}`] = jsFile;
            destIgnoredFiles.push(`!${jsFile}`)
          }
          if (i === 1) {
            entryFiles[`sp/${key}`] = jsFile;
            destIgnoredFiles.push(`!${jsFile}`)
          }
        }
      } catch(err) {}
    }
    // for 文の最後の loop で実行
    if (i === pathsLen - 1) {
      const keys = Object.keys(entryFiles);
      // sp / pc どちらの js ファイルも全て empty または polyfill と名のついたファイルだった時
      if (keys.length === 0) {
        gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.release))
        return false;
      }
      // sp / pc の js ファイルが１つ以上でも empty または polyfill と名のついたファイルだった時
      if (keys.length !== jsFileCount) {
        gulp.src([paths.scripts.src, ...destIgnoredFiles])
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.release))
      }
    }
  }
  return entryFiles;
}

module.exports = function transpileScript(done) {
  const paths = getPaths(this);
  const entryFiles = filteringEmptyFile(paths);
  if (!entryFiles) return done();

  return gulp.src(['./src/**/js/*.js'])
  .pipe(plumber())
  .pipe(webpackStream({
    mode: "production",
    context: path.resolve(__dirname, '../'),
    entry: entryFiles,
    devtool: 'source-map',
    output: {
      filename: "[name].js"
    },
    module: {
      rules: [ option.lint.js ? {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
            failOnError: true
          }
        } : {},
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
              {
              // Babel を利用する
              loader: 'babel-loader',
            },
          ]
        },
      ],
    },
  }, webpack))
  .pipe(gulp.dest(paths.scripts.release));
};
