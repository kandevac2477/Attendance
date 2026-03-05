/*==============
　Dockerコマンド
==============*/
docker exec -it 0bbe53872678 bash

--ls実行
docker exec -it 0bbe53872678 ls

--新パッケージインストール
docker exec -it 0bbe53872678 npm install axios

--コンテナの再起動
docker restart 0bbe53872678

--再ビルド
docker build -t my-nextjs-image .
docker stop 0bbe53872678
docker rm 0bbe53872678
docker run -p 3000:3000 -d my-nextjs-image

/*==============
　コミット・プッシュ
==============*/
--コミット("この中にコミットメッセージ記載")
git commit -m ""

--プッシュ
git push origin main

/*==============
　確認URL
==============*/
http://localhost:3000

/*==============
　supabaseのテーブル変更をPrismaに反映させる
==============*/
npx prisma db pull
npx prisma generate

/*==============
　schema.prismaのテーブル変更をPrismaに反映させる
（直接ファイルないを変更した場合）
==============*/
npx prisma migrate dev --name your_migration_name 
# --name でマイグレーション名を指定（例: add_users_table）
npx prisma generate