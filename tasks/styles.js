const gulp = require('gulp')
const postcss = require('gulp-postcss')
const prettify = require('postcss-prettify')
const extend = require('postcss-extend');
const _import = require('postcss-import');
const nested = require('postcss-nested');
const customProperties = require('postcss-custom-properties');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer')
const plumber = require('gulp-plumber')
const { getPaths, option } = require('./config')
const inlineComment = require('postcss-strip-inline-comments')
const scss = require('postcss-scss');
const rename = require('gulp-rename');

const getPostcssModules = () => [
  _import(),
  extend(),
  customProperties({preserve: false}),
  nested(),
  inlineComment,
  autoprefixer(option.autoprefixer),
  prettify(),
];

/**
 * PostCSS -> CSS
 */
module.exports = function compileToCss() {
  const paths = getPaths(this);
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(postcss(getPostcssModules(), {syntax: scss}))
    .pipe(csscomb())
    .pipe(rename({
      extname: '.css'
    }))
    .pipe(gulp.dest(paths.styles.release));
};
