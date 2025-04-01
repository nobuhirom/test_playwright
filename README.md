# CRM System

## 概要
このプロジェクトは、Next.js 14を使用して開発されたCRMシステムです。顧客管理、プロジェクト管理、タスク管理などの機能を提供します。

## 技術スタック
- **フロントエンド**
  - Next.js 14
  - TypeScript
  - TailwindCSS
  - React Query
  - Zustand

- **バックエンド**
  - Next.js API Routes
  - MongoDB
  - Mongoose
  - NextAuth.js

- **インフラ**
  - Vercel
  - MongoDB Atlas

## 主な機能
- [x] 認証機能
  - ユーザー登録
  - ログイン/ログアウト
  - パスワードリセット
  - ユーザーロール管理

- [x] プロジェクト管理機能
  - プロジェクトの作成・編集・削除
  - プロジェクト一覧表示
  - プロジェクト検索・フィルタリング
  - プロジェクトステータス管理
  - 顧客との紐付け

- [ ] 顧客管理機能
  - 顧客情報の登録・編集・削除
  - 顧客一覧表示
  - 顧客検索・フィルタリング

- [ ] タスク管理機能
  - タスクの作成・編集・削除
  - タスク一覧表示
  - タスクの割り当て
  - タスクのステータス管理

- [ ] ダッシュボード機能
  - 売上予測グラフ
  - 商談進捗状況
  - 期限間近タスク
  - 進行中案件

## 開発環境のセットアップ

### 必要条件
- Node.js 18.0.0以上
- npm 9.0.0以上
- MongoDB

### 環境変数の設定
`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email (オプション)
EMAIL_SERVER_HOST=your_email_server_host
EMAIL_SERVER_PORT=your_email_server_port
EMAIL_SERVER_USER=your_email_server_user
EMAIL_SERVER_PASSWORD=your_email_server_password
EMAIL_FROM=your_email_from
```

### インストールと起動
```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## プロジェクト構造
```
crm-system/
├── src/
│   ├── app/              # Next.js 14 App Router
│   │   ├── api/         # API Routes
│   │   ├── auth/        # 認証関連ページ
│   │   ├── customers/   # 顧客管理ページ
│   │   ├── projects/    # プロジェクト管理ページ
│   │   └── tasks/       # タスク管理ページ
│   ├── components/      # 共通コンポーネント
│   ├── lib/            # ユーティリティ関数
│   ├── models/         # Mongooseモデル
│   └── types/          # TypeScript型定義
├── public/             # 静的ファイル
└── _docs/             # プロジェクトドキュメント
```

## 開発ガイドライン
- コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)に従う
- コードスタイルはESLintとPrettierに従う
- 新機能の追加時はテストを書く

## ライセンス
MIT 