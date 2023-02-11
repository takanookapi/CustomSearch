## 概要
* Google検索一覧画面機能

## API
* CustomSearchAPI

## 注意点
* dockerでインフラを構築しており、ローカル環境での開発</br>
┗docker install</br>
┗docker compose up -d //dockerが入っていれば、こちらのコマンドですぐに環境構築が可能です。</br>
* /common/constants.phpにある"CUSTOM_SEARCH_API_KEY"、"CUSTOM_SEARCH_ID"に
それぞれGooglのAPIキー、CustomSearchAPIで使用する検索エンジンIDの入力をお願いします。
* 管理画面を想定して開発したため、canonicalやmetaタグは省略

## バージョン
* Nginx                 1.20.2
* PHP                   8.1.11
* Docker                20.10.17
* docker-compose        2.10.2
* git                   2.24.3
