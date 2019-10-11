# Frontend Dev Environment

## 概要

gulp4.0 + webpack を使用したフロントエンド開発環境。  
この開発環境を使用することで作業ファイルは下記のようにコンパイルされます。

* 最新の EcmaScript(Javascript) は ES5 へ変換されます。ES modules 機能の使用も可能。
* ES5 以降に実装された新しい関数なども使用できます。（Promise など）
* scss は css へと変換され、prefix も設定に応じて自動で付与されます。
* hbs ファイルは html へ変換されます。Handlebars の機能が利用可能。
* img は設定に応じて圧縮されます。

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
.
├── README.md
├── gulpfile.js
├── package.json
├── release # gulpにより生成。コンパイル後のファイルを格納
│   └── project01
│       ├── _html # 開発環境での表示確認用 html
│       ├── css
│       ├── html # サーバーへアップロード用 html
│       ├── img
│       └── js
├── src # 開発用ディレクトリ
│   └── project01 # 任意のディレクトリ名でsrc直下に複数作成可能
│       ├── css
│       ├── hbs
│       ├── img
│       └── js
│           ├── modules # export 専用の js を配置。release/ に出力されない
│           ├── plugins # webpack により bundle されず、release/ に出力される
│           └── xxx # 任意のディレクトリ名（複数作成可能）
├── tasks # gulpの各タスクファイル
│   ├── clean.js
│   ├── config.js # eslint, stylelintの ON/OFF やその他設定
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

## その他、仕様の詳細

* 空の js ファイルは webpack でコンパイルされず、空のまま release/ へ出力される。
* src/js/ 配下のディレクトリ構成は自由に構成可能であり、js/ 直下に js ファイルを配置することも可能。  
ディレクトリに特定の名前（modules, plugins）をつけた場合、  
その配下の js は webpack の entry 対象から除外される。
* src/ 直下にディレクトリを新たに追加、または名前変更した場合は tasks/config.js の編集が必要。
* release/html/ は _html/ とは異なり img href="" のURLが tasks/config.js で設定した path へ置換される。
* scss で使用可能な機能は下記項目のみ。
  * ネスト
  * コメントアウト(//)
  * @extend（継承)
  * @import（連結)
  * CSS変数（$ から始まる scss 独自の変数ではなく native css 変数)
* 開発環境が起動している状態で src/ 配下のファイルを編集保存すると自動リロードされる。毎回手動でリロードする必要はありません。
* ターミナルに表示される External の Url を使用すれば、開発に使用しているデバイス以外からも同一ネットワーク内であればアクセス可能。

## 使用技術に関すること

* node-sass ではなく postcss の使用。
  * scss は 最初から機能が全部入りなので、必要機能のみを postcss で取り入れ動作の軽量化を行なった。
  * 変数制限は $ ではなく、css ネイティブな変数（カスタムプロパティー）を使用。
* gulp-postcss で stylelint を使用するのではなく、 stylelint は独立で使用。
  * postcss では stylelint の fix option が使えないため。
* 本環境の webpack-stream のバージョンは最新(5.2.1)ではなく 5.0.0 を採用。
  * [webpack-stream_issue](https://github.com/shama/webpack-stream/issues/201#issue-349855519)
