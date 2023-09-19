# InstaClothes

## 目次
- [InstaClothes](#instaclothes)
  - [目次](#目次)
  - [概要](#概要)
  - [事前準備](#事前準備)
  - [.envファイルの設定事項](#envファイルの設定事項)
    - [backend](#backend)
      - [seed関数を実行する場合](#seed関数を実行する場合)
  - [実行方法](#実行方法)
    - [tokenを取得する](#tokenを取得する)
  - [開発環境](#開発環境)
    - [使用技術](#使用技術)
  - [画像取得機能のサイトごとの対応](#画像取得機能のサイトごとの対応)
    - [Sheinに関して](#backendfunctionsget_imgget_shein_img.py-sheinに関して)
    - [Zozoに関して](#backendfunctionsget_imgget_zozo_img.py-zozoに関して)
    - [Shop-listに関して](#backendfunctionsget_imgget_shoplist_img.py-shop-listに関して)
    - [Defaultの対応に関して](#backendfunctionsget_imgdefault_img.py-defaultの対応に関して)

## 概要
InstaClothesは、オンラインショッピングで服を探している際に起こる一般的な問題を解決するWebアプリケーションです。多くの人々は、気に入った服を見つけたらいったんカートに入れますが、後でどのサイトで何をカートに追加したのかを忘れてしまうことがあります。InstaClothesは、そんな悩みを一括で解決します。

このアプリでは、ほしい服のリストを一元的に管理できます。さらに、それぞれの服の写真も掲載することで、一目でどのアイテムがどこで販売されているのかを視覚的に把握することができます。

## 事前準備
- [Docker Desktop](https://www.docker.com/products/docker-desktop)をインストールする
- [firebase](https://firebase.google.com/)のアカウントを作成する
- [firebase](https://firebase.google.com/)でプロジェクトを作成する([プロジェクト作成方法](https://firebase.google.com/docs/projects/learn-more?hl=ja))
- [firebase](https://firebase.google.com/)でAuthenticationを有効にする([Authenticationの有効化方法](https://firebase.google.com/docs/auth/web/password-auth?hl=ja))
- [firebase](https://firebase.google.com/)で秘密鍵を発行する([秘密鍵作成方法](https://firebase.google.com/docs/admin/setup?hl=ja))
- git cloneする
- [.envファイル](#envファイルの設定事項)を作成する

## .envファイルの設定事項
### backend
- `backend`ディレクトリに`.env`ファイルを作成して以下の環境変数を設定します。
```
# 実行環境関連パラメータ
ENVIRONMENT=         # 実行環境（development, production）

# PostgreSQL設定
POSTGRES_USER=       # PostgreSQLのユーザー名
POSTGRES_PASSWORD=   # PostgreSQLのパスワード
POSTGRES_DB=         # 本番用のデータベース名
POSTGRES_TEST_DB=    # テスト用のデータベース名
POSTGRES_SERVER=     # PostgreSQLサーバーのアドレス（通常はlocalhostまたはIPアドレス）
POSTGRES_PORT=       # PostgreSQLのポート（デフォルトは5432）

# サーバー関連パラメータ
PRODUCT_SEVER_DOMAIN= # 本番用のサーバーのドメイン

# Firebase Web APIキー
API_KEY=             # API認証用のキー

# custom_token.py用設定 (設定しなくても支障はないです)
TEST_MAIL='test1@example.com'       # テスト用のメールアドレス
TEST_PASSWORD='test1pass'           # テスト用のパスワード

# seed用設定（seed関数を実行する場合に必要）
TESTER1_UID=                        # テスター1のUID
TESTER2_UID=                        # テスター2のUID

# token_of_seed_data.py用設定（seed関数を実行する場合に必要）
TESTER1_MAIL=                       # テスター1のメールアドレス
TESTER1_PASSWORD=                   # テスター1のパスワード
TESTER2_MAIL=                       # テスター2のメールアドレス
TESTER2_PASSWORD=                   # テスター2のパスワード
```
#### seed関数を実行する場合
1. [firebase](https://firebase.google.com/)のAuthenticationにテスターとして2つのアカウントを追加します。
2. 追加したテスターのUID、メールアドレス、パスワードをそれぞれの環境変数（TESTER1_UID, TESTER1_MAIL, TESTER1_PASSWORD, TESTER2_UID, TESTER2_MAIL, TESTER2_PASSWORD）に設定します。


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
5. 秘密鍵を発行したら、`backend`ディレクトリ直下の`core`ディレクトリに`lil_pro_account_key.json`という名前で保存する
6. `backend`ディレクトリに移動
    ```bash
    cd backend
    ```
7. Dockerコンテナをビルドと起動
    ```bash
    docker compose up
    ```
8. alembicを使ってデータベースをマイグレーション
    ```bash
    pipenv run upgrade
    ```
9. seedデータをデータベースに追加([`seed関数を実行する場合`](#seed関数を実行する場合)の設定を参照してください。)
    ```bash
    pipenv run seed
    ```
10. backendサーバーを起動
    ```bash
    pipenv run start
    ```
11. backendサーバーが起動すると、以下のURLでAPIドキュメントにアクセスできます。
    ```
    http://localhost:8000/docs
    ```

### tokenを取得する
1. `backend`ディレクトリに移動
    ```bash
    cd backend
    ```
1. `generate_token.py`を実行
    ```bash
    pipenv run generate_token
    ```
    [`seed関数を実行する場合`](#seed関数を実行する場合)の設定をしてください。

## 開発環境
Windowsでしか動作確認していません。
### 使用技術
- バックエンド: FastAPI
- フロントエンド: React
- データベース: PostgreSQL
- 認証: Firebase Authentication (JWT)
- コンテナオーケストレーション: Docker
- バージョン管理: Git

### 画像取得機能のサイトごとの対応

#### backend/functions/get_img/get_shein_img.py (Sheinに関して)
この関数は、Sheinのサイトから指定されたURLで画像を取得する機能を持っています。Sheinのサイトに頻繁にアクセスするとアクセス制限がかかる可能性があり、その場合はエラーが発生することがあります。この点に注意して使用してください。

#### backend/functions/get_img/get_zozo_img.py (Zozoに関して)
この関数は、Zozoのサイトから指定されたURLで画像を取得する機能を持っています。Zozoのサイトの仕様により、seleniumの機能を使用してGoogleドライバを経由してGoogle Chromeを動かす必要があります。

#### backend/functions/get_img/get_shoplist_img.py (Shop-listに関して)
この関数は、Shop-listのサイトから指定されたURLで画像を取得する機能を持っています。Shop-listに関する特別な注意事項や制限はありません。

#### backend/functions/get_img/default_img.py (Defaultの対応に関して)
この関数は、指定されたサイト以外からの画像取得を行うデフォルトの機能を持っています。デフォルトではフリーの画像を使用しています。
