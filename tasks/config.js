/*
 * ここでアップロード先のimageディレクトリ名を指定しておく
 * 書き換えた後は一度 gulp を再起動してください
 */
const replacePath = {
  project01: {
    pc: 'https://example.com/',
    sp: 'https://example.com/'
  },
  // project02: {
  //   pc: 'https://example.com',
  //   sp: 'https://example.com'
  // }
};

const getPaths = (dir) => {
  return {
    allSrc: [
      'src/**/css/**/*.scss',
      'src/**/css/common/*.scss',
      'src/**/hbs/**/*.hbs',
      'src/**/js/**/*.js',
      'src/**/img/**/*.png',
      'src/**/img/**/*.jpg',
    ],
    project: {
      release: `release/${dir}`,
      src: `src/${dir}`,
    },
    styles: {
      src: [
        `src/${dir}/css/**/*.scss`,
        `!src/${dir}/css/common/*.scss`,
      ],
      release: `release/${dir}/css/`
    },
    templates: {
      src: [
        `src/${dir}/hbs/**/*.hbs`,
        `!src/${dir}/hbs/partials/*.hbs`
      ],
      release: `release/${dir}/_html/`,
      release2: `release/${dir}/html/`,
      partials: `src/${dir}/hbs/partials/*.hbs`,
    },
    scripts: {
      src: `src/${dir}/js/**/*.js`,
      release: `release/${dir}/js/`,
    },
    images: {
      src: [
        `src/${dir}/img/**/*.png`,
        `src/${dir}/img/**/*.jpg`
      ],
      release: `release/${dir}/img/`
    }
  }
}

const option = {
  // 構文チェックの ON/OFF
  lint: {
      css: true,
      js: true
  }
}

module.exports = { replacePath, getPaths, option }
