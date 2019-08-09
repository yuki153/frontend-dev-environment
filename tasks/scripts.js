const gulp = require("gulp");
const plumber = require('gulp-plumber')
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const { getPaths, option } = require('./config');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const getEntryFiles = (paths) => {
  let entryFiles = {};
  let destIgnoredFiles = [];
  let jsFiles = [];
  let isEntryAll = true;

  glob.sync(`./${paths.scripts.src}`).map(jsFilePath => {
    jsFiles.push(jsFilePath);
  });

  for (const jsFile of jsFiles) {
    try {
      const fileData = fs.readFileSync(jsFile, 'UTF-8')
      const fileName = path.basename(jsFile, path.extname(jsFile));
      const fragments = jsFile.split('/');
      const indexOfFileName = fragments.indexOf(`${fileName}.js`);
      const isModulesDir = /^modules?$/.test(fragments[indexOfFileName - 1]);
      const isPluginsDir = /^plugins?$/.test(fragments[indexOfFileName - 1]);
      const isEmptyFile = !(fileData.length && /[a-z]/.test(fileData));
      if (false === isEmptyFile && false === isPluginsDir) {
        if (isModulesDir || indexOfFileName >= 6) {
          destIgnoredFiles.push(`!${jsFile}`)
        } else if (isModulesDir) {
          isEntryAll = false;
        } else if (indexOfFileName === 4) {
          entryFiles[fileName] = jsFile;
          destIgnoredFiles.push(`!${jsFile}`)
        } else if (indexOfFileName === 5) {
          entryFiles[`${fragments[4]}/${fileName}`] = jsFile;
          destIgnoredFiles.push(`!${jsFile}`)
        }
      } else {
        isEntryAll = false;
      }
    } catch(err) {console.log(err)}
  }
  if (false === isEntryAll) {
    gulp.src([paths.scripts.src, ...destIgnoredFiles])
    .pipe(gulp.dest(paths.scripts.release))
  }
  return entryFiles;
}

module.exports = function transpileScript(done) {
  const paths = getPaths(this);
  const entryFiles = getEntryFiles(paths);
  if (Object.keys(entryFiles).length < 1) return done();

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
