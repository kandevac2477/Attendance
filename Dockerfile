# ベースイメージとしてNode.jsのLTSバージョンを使う
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# ホストマシンのpackage.jsonとpackage-lock.jsonをコンテナにコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ホストマシンの残りのソースコードをコンテナにコピー
COPY . .

# ビルド処理
RUN npm run build

# アプリケーションがリッスンするポートを公開
EXPOSE 3004

# Next.jsアプリケーションを起動するコマンド
CMD ["npm", "start"]
