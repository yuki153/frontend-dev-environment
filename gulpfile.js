const gulp = require('gulp')
const { serveIfNeeded, serve, reload } = require('./tasks/server')
const { compileToFtpHtml, compileToLocalHtml } = require('./tasks/templates')
const { minifyPng, minifyJpg } = require('./tasks/images')
const clean = require('./tasks/clean')
const scripts = require('./tasks/scripts')
const styles = require('./tasks/styles')
const stylelint = require('./tasks/stylelint')
const replace = require('./tasks/strReplace')
const { getPaths } = require('./tasks/config');
const selectedProjectName = require('./tasks/getArgument')
let projects = require('./tasks/getDirNames')
if (selectedProjectName) projects = [ selectedProjectName ];

/**
 * ファイルの変更を監視
 */
function smartlyWatch(done) {
  const paths = getPaths(this);
    gulp.watch(paths.styles.src, gulp.series(
      stylelint.bind(this),
      styles.bind(this),
      compileToFtpHtml.bind(this),
      replace.bind(this),
      reload
    ));
    gulp.watch(paths.scripts.src, gulp.series(
      scripts.bind(this),
      compileToFtpHtml.bind(this),
      replace.bind(this),
      reload
    ));
    gulp.watch([...paths.templates.src, paths.templates.partials], gulp.series(
      compileToLocalHtml.bind(this),
      compileToFtpHtml.bind(this),
      replace.bind(this),
      reload
    ));
    gulp.watch(paths.images.src, gulp.series(
      minifyJpg.bind(this),
      minifyPng.bind(this),
      reload
    ));
  done();
}

/**
 * gulpTasks へ src 配下のプロジェクト（directory）の数だけタスクを生成して格納
 */
let gulpTasks = [];
for (const project of projects) {
  gulpTasks.push(
    gulp.series(
      clean.bind(project),
      gulp.parallel(
        stylelint.bind(project),
        minifyJpg.bind(project),
        minifyPng.bind(project),
      ),
      gulp.parallel(
        styles.bind(project),
        scripts.bind(project),
        compileToLocalHtml.bind(project),
        compileToFtpHtml.bind(project),
      ),
      replace.bind(project),
      serveIfNeeded.bind(project),
      smartlyWatch.bind(project),
    )
  );
}

/**
 * 開発用ビルド
 */
gulp.task('default', gulp.series(gulp.parallel(...gulpTasks), serve));
gulp.task('select', gulp.series(gulpTasks[0]));
