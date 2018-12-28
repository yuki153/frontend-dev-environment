const stylelint = require('stylelint')
const { option } = require('./config')
const yellow  = '\u001b[33m';
const reset   = '\u001b[0m';

const outputLog = async function(data) {

  /*
  MDN solution code
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
  */
  const seen = [];
  const replacer = function(key, value) {
    if (value != null && typeof value == "object") {
      if (seen.indexOf(value) >= 0) {
        return;
      }
      seen.push(value);
    }
    return value;
  };

  const obj = JSON.parse(JSON.stringify(data, replacer));
  const arrResults = obj.results;
  for(const result of arrResults) {
    const arrWarnings = result.warnings;
    if (arrWarnings.length) console.log(`📃  ${result.source}`);
    for(const warning of arrWarnings) {
      console.log(`⚠️  ${yellow}[style-error]${reset}${warning.line}行目::${warning.text}`);
    }
  }
};

module.exports = async function lint(done) {
  if (!option.lint.css) return done();
  const data = await stylelint.lint({
    files: `src/${this}/**/*.scss`,
    formatter: "json",
    fix: true,
  });
  await outputLog(data);
  done();
}
