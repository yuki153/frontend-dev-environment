const gulp = require('gulp')
const imagemin = require("gulp-imagemin")
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const { getPaths } = require('./config.js')

function minifyPng() {
  const paths = getPaths(this);
  return gulp.src(paths.images.src[0])
    .pipe(imagemin([
      pngquant({
        quality: '85', // 画質
        speed: 1,      // 最低のスピード
        floyd: 0,      // ディザリングなし
      })
    ]))
    .pipe(imagemin())  // 余計なガンマ情報削除
    .pipe(gulp.dest(paths.images.release));
}

function minifyJpg() {
  const paths = getPaths(this);
  return gulp.src(paths.images.src[1])
    .pipe(imagemin([
      mozjpeg({
        quality: 85,  // 画質
        progressive: true
      })
    ]))
    .pipe(gulp.dest(paths.images.release));
}

module.exports = { minifyPng, minifyJpg }
