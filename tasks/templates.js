const gulp = require('gulp');
const hb = require('gulp-hb');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const beauty = require('gulp-prettify')
const { getPaths } = require('./config')

function compileToLocalHtml() {
  const paths = getPaths(this);
  const hbStream = hb()
    .partials(paths.templates.partials);
  return gulp.src(paths.templates.src)
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(beauty({
      indent_size: 4,
    }))
    .pipe(gulp.dest(paths.templates.release))
};

function compileToFtpHtml() {
  const paths = getPaths(this);
  const hbStream = hb()
    .partials(paths.templates.partials);
  return gulp.src(paths.templates.src)
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(beauty({
      indent_size: 4,
    }))
    .pipe(gulp.dest(paths.templates.release2));
};

module.exports = { compileToFtpHtml, compileToLocalHtml }
