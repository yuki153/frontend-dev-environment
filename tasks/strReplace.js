const fs = require('fs');
const { getPaths, replacePath } = require('./config');

module.exports = function strReplace(done) {
  const paths = getPaths(this);
  const ftpPaths = [
    `./${paths.templates.release2}pc/`,
    `./${paths.templates.release2}sp/`
  ];
  let filePaths = [];
  for (const path of ftpPaths) {
    // fs.readdirSync が sp または pc ディレクトリが無い場合処理が停止するため error handling を行う
    try {
      // ftpPaths 配下のファイルを取得
      const files = fs.readdirSync(path);
      // .DS_Store の除去
      const regExp = /^\./;
      if (regExp.test(files[0])) files.shift();
      for (const file of files) {
        // ftpPaths と 取得したファイル名を結合したパスを filePaths 配列へ格納
        filePaths.push(path + file);
      }
    } catch (err) {}
  }

  /**
   * filePaths へ格納された パス（ファイル）に対して置換処理を行う
   */
  for (const filePath of filePaths) {
    fs.readFile(filePath, 'UTF-8',
      (error, data) => {
        if (error) console.log('error fs.readFile');
        const writtenData = data.
        replace(/\.\.\/\.\.\/img\/sp\//gi, replacePath[this].sp).
        replace(/\.\.\/\.\.\/img\/pc\//gi, replacePath[this].pc);
        fs.writeFile(filePath, writtenData, 'UTF-8', function (err) {
          if (err) return console.log(err);
        });
      }
    );
  }
  done();
}
