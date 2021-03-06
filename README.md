# Mocha Practice

### Build Test

#### Circle CI

[![CircleCI](https://circleci.com/gh/nekonenene/mocha_practice1/tree/master.svg?style=svg)](https://circleci.com/gh/nekonenene/mocha_practice1/tree/master)

#### wercker

[![wercker status](https://app.wercker.com/status/581d3f5ed513595bbfb694ecabeec3c5/s/master "wercker status")](https://app.wercker.com/project/byKey/581d3f5ed513595bbfb694ecabeec3c5)


## 開発するには……

### 1. このレポジトリをコピー

以下のようにコマンド
```
git clone git@github.com:nekonenene/mocha_practice1.git
```

### 2. Node.js をインストール

Windows なら、chocolatey で `choco install nodejs -y`  
Mac なら、homebrew で `brew install nodejs`

上記のことがわからないなら、[Node.js のホームページ](https://nodejs.org/)から安定版をダウンロードしてインストール


### 3. Bundler をインストール

Win : `choco install ruby -y`  
Mac : `brew install ruby`  

[Ruby](https://www.ruby-lang.org/) をインストールしたのち、
```ruby
gem install bundler
```


### 4. 開発に必要な依存パッケージ群をインストール

プロジェクトがあるディレクトリで以下のようにコマンド
```
npm install
```

それから、
```
bundle install
```
ただし `bundle install` は、オプションなしだとシステム（グローバル環境）にインストールされるので、  
それが嫌な場合は `bundle install --path vendor/bundle` とコマンド


### 5. 開発監視ツールを起動

（もし gulp を入れていないなら）
```
npm install -g gulp
```

gulp をインストール後は、プロジェクトがあるディレクトリで以下のようにコマンド
```
gulp
```

これで source フォルダ内のファイルの更新を監視して、更新があると  
sass のコンパイルとか babel とか minify が走ってくれて、  
optimized フォルダに書き出してくれる。すごい。
