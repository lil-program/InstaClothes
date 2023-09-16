# InstaClothes

## 目次
- [InstaClothes](#instaclothes)
  - [目次](#目次)
  - [概要](#概要)
  - [事前準備](#事前準備)
    - [backend](#backend)
  - [.envファイルの設定事項](#envファイルの設定事項)
  - [実行方法](#実行方法)
  - [開発環境](#開発環境)
    - [使用技術](#使用技術)

## 概要
InstaClothesは、オンラインショッピングで服を探している際に起こる一般的な問題を解決するWebアプリケーションです。多くの人々は、気に入った服を見つけたらいったんカートに入れますが、後でどのサイトで何をカートに追加したのかを忘れてしまうことがあります。InstaClothesは、そんな悩みを一括で解決します。

このアプリでは、ほしい服のリストを一元的に管理できます。さらに、それぞれの服の写真も掲載することで、一目でどのアイテムがどこで販売されているのかを視覚的に把握することができます。

## 事前準備
- [Docker Desktop](https://www.docker.com/products/docker-desktop)をインストールする
- [firebase](https://firebase.google.com/)のアカウントを作成する
- [firebase](https://firebase.google.com/)でプロジェクトを作成する
- [firebase](https://firebase.google.com/)でAuthenticationを有効にする
- [firebase](https://firebase.google.com/)で秘密鍵を発行する
- git cloneする
- [.envファイル](#envファイルの設定事項)を作成する

## .envファイルの設定事項
### backend
- `backend`ディレクトリに`.env`ファイルを作成して以下の環境変数を設定します。
```
POSTGRES_USER=       # PostgreSQLのユーザー名
POSTGRES_PASSWORD=   # PostgreSQLのパスワード
POSTGRES_DB=         # 本番用のデータベース名
POSTGRES_TEST_DB=    # テスト用のデータベース名
POSTGRES_SERVER=     # PostgreSQLサーバーのアドレス（通常はlocalhostまたはIPアドレス）
POSTGRES_PORT=       # PostgreSQLのポート（デフォルトは5432）

API_KEY=             # API認証用のキー
TEST_MAIL=           # テスト用のメールアドレス
TEST_PASSWORD=       # テスト用のパスワード
```

## 実行方法
1. pipenvのインストール
    ```bash
    #windowsの場合
    pip install pipenv
    ```
2. 必要なライブラリのインストール
    ```bash
    pipenv install
    ```
3. `.env`ファイルを作成
4. `.env`ファイル内で各種設定を行う
    ⇒ [.envファイルの設定事項](#envファイルの設定事項)へ
5. 秘密鍵を発行したら、`backend`ディレクトリに`lil_pro_account_key.json`という名前で保存する
6. Dockerコンテナをビルドと起動
    ```bash
    docker compose up
    ```
7. alembicを使ってデータベースをマイグレーション
    ```bash
    pipenv run upgrade
    ```
8.  バックエンドサーバーを起動
    ```bash
    pipenv run start
    ```
9. バックエンドサーバーが起動すると、以下のURLでAPIドキュメントにアクセスできます。
    ```
    http://localhost:8000/docs
    ```

## 開発環境
Windowsでしか動作確認していません。
### 使用技術
- バックエンド: FastAPI
- フロントエンド: React
- データベース: PostgreSQL
- コンテナオーケストレーション: Docker
- バージョン管理: Git


