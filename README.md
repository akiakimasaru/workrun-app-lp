# LP Pro - アプリLP量産サイト

Next.js (App Router) で Markdown ファイルからアプリLPを量産できる静的サイトジェネレーターです。

## 機能

- `/apps` - アプリ一覧（検索、カテゴリフィルタ、ソート対応）
- `/apps/{slug}` - アプリ詳細ページ（Hero、Use Cases、Capabilities、FAQ、関連アプリなど）
- `/categories` - カテゴリ一覧
- `/categories/{categorySlug}` - カテゴリ別アプリ一覧
- SEOメタタグ対応（title、description、OG画像）
- 関連アプリの自動解決（存在するslugのみ表示）
- すべてSSG（Static Site Generation）で生成

## 技術スタック

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **gray-matter** - Frontmatterパース
- **react-markdown** + **remark-gfm** - Markdownレンダリング

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 3. ビルド

```bash
npm run build
```

### 4. 本番環境での起動

```bash
npm start
```

## 新しいアプリLPの追加方法

### ステップ1: Markdownファイルを作成

`content/apps/{slug}.md` に新しいMarkdownファイルを作成します。

例: `content/apps/notion.md`

### ステップ2: Frontmatterを記述

YAML frontmatterに必要な情報を記述します：

```yaml
---
app:
  slug: notion
  name: Notion
  categories:
    - ドキュメント・ノート
    - プロジェクト管理
  icon: 📝
seo:
  title: Notion連携アプリ | ドキュメント管理を自動化
  description: Notionと連携してページ作成、データ同期などを自動化できます。
  ogImage: /og/notion.png
hero:
  eyebrow: ドキュメント管理
  headline: Notionで業務を自動化
  lead: Notionと連携してページ作成、データ同期、通知などを自動化します。
  ctas:
    - label: 今すぐ始める
      href: /signup
      variant: primary
useCases:
  title: 主な用途
  items:
    - title: 自動ページ作成
      description: イベントに基づいてNotionページを自動作成します。
      icon: 📄
capabilities:
  title: 機能一覧
  operations:
    - ページ作成
    - データベース更新
  triggers:
    - 新規ページ作成
relatedApps:
  title: 関連アプリ
  items:
    - slug: slack
      reason: Notionの更新をSlackに通知
faq:
  title: よくある質問
  items:
    - q: 無料で使えますか？
      a: はい、基本的な機能は無料でご利用いただけます。
articles:
  title: 関連記事
  items:
    - title: Notion連携の始め方
      href: /articles/notion-getting-started
---

## 本文（任意）

ここにMarkdown形式で本文を記述できます。

### 見出し

- リスト項目1
- リスト項目2
```

### ステップ3: ビルド

```bash
npm run build
```

新しいアプリLPが自動的に生成されます。コードの修正は不要です。

## Frontmatter仕様

### 必須フィールド

- `app.slug` - URLで使用されるスラッグ（ファイル名と一致させる）
- `app.name` - アプリ名
- `app.categories` - カテゴリ配列（日本語可）
- `seo.title` - SEOタイトル
- `seo.description` - SEO説明
- `hero.headline` - ヒーロー見出し
- `hero.lead` - ヒーロー説明文

### オプションフィールド

- `app.icon` - アイコン（絵文字推奨）
- `seo.ogImage` - OG画像のパス
- `hero.eyebrow` - ヒーロー上部の小さなテキスト
- `hero.ctas` - CTAボタン配列
- `useCases` - 用途セクション
- `capabilities` - 機能セクション
- `relatedApps` - 関連アプリセクション（`slug`で指定、存在しないものは非表示）
- `faq` - FAQセクション
- `articles` - 関連記事セクション

## カテゴリについて

- カテゴリ名は日本語で記述可能
- カテゴリスラッグは自動生成（小文字・ハイフン化）
- 例: `チャット・コミュニケーション` → `chat-communication`

## デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート
3. ビルドコマンド: `npm run build`
4. 出力ディレクトリ: `out`（Next.jsの静的エクスポート）

### その他の静的ホスティング

`npm run build` で `out` ディレクトリに静的ファイルが生成されます。
このディレクトリを任意の静的ホスティングサービスにデプロイできます。

## 開発コマンド

- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm start` - 本番サーバー起動（静的エクスポートのため通常は不要）
- `npm run lint` - ESLintでコードチェック
- `npm run format` - Prettierでコードフォーマット

## ファイル構造

```
LP_pro/
├── app/
│   ├── apps/
│   │   ├── [slug]/
│   │   │   └── page.tsx      # アプリ詳細ページ
│   │   ├── apps-client.tsx   # アプリ一覧（クライアント）
│   │   └── page.tsx          # アプリ一覧（サーバー）
│   ├── categories/
│   │   ├── [categorySlug]/
│   │   │   └── page.tsx      # カテゴリ別一覧
│   │   └── page.tsx          # カテゴリ一覧
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── content/
│   └── apps/
│       ├── gmail.md
│       └── slack.md
├── lib/
│   └── content.ts            # データ取得ロジック
├── types/
│   └── content.ts            # 型定義
└── package.json
```

## ライセンス

MIT
