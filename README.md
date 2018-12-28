# Frontend Dev Environment
gulp4.0 + webpack によるフロントエンド開発環境

## 推奨環境
* node version 8 以上
* yarn の使用

## 使用方法
下記コマンドをターミナルで打ちます

1. `yarn`（初回のみ）
2. `yarn gulp`

### その他コマンド

* `yarn gulp select --XXXX`

    ※ 作業するプロジェクト(directory)を指定して、そのプロジェクトのみをコンパイル処理します。
    `yarn gulp` では src 配下に存在するプロジェクトを全て対してコンパイル処理を行うので、
    src 配下に複数のプロジェクトが存在する場合は、こちらの方が軽量で高速に処理することができます。
    `XXXX` の部分には作業するプロジェクトを指定します。
