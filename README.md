# Frontend Dev Environment

## 概要

gulp4.0 + webpack によるフロントエンド開発環境
この開発環境を使用することで作業ファイルは下記のようにコンパイルされます

* 最新のEcmaScript は ES5 へ変換されます。ES modules機能の使用も可能
* ES5 以降に実装された新しい関数なども使用できます。（Promise など）
* scss は css へと変換され、prefix も設定に応じて自動で付与されます
* img は設定に応じて圧縮されます

## 推奨環境

* node version 8 以上
* yarn の使用

## 使用方法

下記コマンドをターミナルで打ちます

1. `yarn`（初回のみ）
2. `yarn gulp`（開発環境の立ち上げ）

その他コマンド

* `yarn gulp select --XXXX`

    ※ 作業する src/ 直下に存在するプロジェクト(directory)を指定して、そのプロジェクトのみをコンパイル処理します。
    `yarn gulp` では src 配下に存在するプロジェクトを全て対してコンパイル処理を行うので、
    src 配下に複数のプロジェクトが存在する場合は、こちらの方が軽量で高速に処理することができます。
    `XXXX` の部分には作業するプロジェクトを指定します。

## ディレクトリー

``` bash
├── README.md
├── gulpfile.js
├── package.json
├── release #コンパイル後のファイルを格納
│   └── project01
│       ├── _html #開発環境での表示確認用html
│       ├── css
│       ├── html
│       ├── img
│       └── js
├── src #開発ディレクトリー
│   └── project01 #任意のファイル名でsrc直下に複数作成可能
│       ├── css #styleを記述。scssで記述可能
│       ├── hbs #htmlを記述。hbsによるpartial化が可能
│       ├── img #imgを格納
│       └── js #jsを記述。最新のEcma構文で記述可能
├── tasks #gulpの各タスクファイル
│   ├── clean.js
│   ├── config.js #eslint/stylelintのON/OFFやその他設定が可能
│   ├── getArgument.js
│   ├── getDirNames.js
│   ├── images.js
│   ├── scripts.js
│   ├── server.js
│   ├── strReplace.js
│   ├── stylelint.js
│   ├── styles.js
│   └── templates.js
└── yarn.lock
```

## その他詳細

* 空のjsファイルは webpack によりコンパイルされず、空のまま出力されます
* ファイル名に「polyfill」という単語を含むファイルは webpack によりコンパイルされず、圧縮のみ行い出力します
* src/ 直下のディレクトリ名を変更または追加した際は tasks/config.js の編集が必要です
* release/html は _html とは異なり img href="" の URL がアップロードサーバーへの path へと置き換わる。tasks/conhig.js で設定が必要。
* scss で使用可能な記述は下記になります
  * ネスト
  * コメントアウト(//)
  * @extend（継承)
  * @import（連結)
  * CSS変数（$から始まる scss 独自の変数とは別)
* 開発環境を立ち上げている状態で src/ 配下のファイルを編集保存すると自動リロードされるので確認の際、毎回手動でリロードする必要がありません
* ターミナルに表示される External の Url を使用すれば、開発に使用しているデバイス以外からも同じネットワーク内であればアクセス可能です

## 使用技術に関すること

* node-sass ではなく postcss の使用
  * scss は 最初から機能が全部入りなので、必要な機能のみを postcss で取り入れ動作の軽量化を行なった
  * scss の独自の$変数ではなく、cssネイティブな変数（カスタムプロパティー）を使用できるようにした
* gulp-postcss で stylelint を使用するのではなく、 stylelint は独立で使用
  * postcss では stylelint の fix option が使えないため
* 本環境の webpack-stream のバージョンは最新(5.2.1)ではなく 5.0.0 を採用
  * [webpack-stream_issue](https://github.com/shama/webpack-stream/issues/201#issue-349855519)
* @babel/polyfill ではなく @babel/plugin-transform-runtime を使用
  * @import 文を余計に書かなくて済む。あとは好みの問題
