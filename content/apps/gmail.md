---
app:
  slug: gmail
  name: Gmail
  categories:
    - メール・コミュニケーション
    - チャット・コミュニケーション
  icon: 📧
seo:
  title: Gmail連携アプリ | メール自動化のすべて
  description: Gmailと連携してメールの自動送信、受信通知、添付ファイル処理などを自動化できます。
  ogImage: /og/gmail.png
hero:
  eyebrow: メール自動化
  headline: Gmailで業務を自動化
  lead: Gmailと連携してメールの送受信を自動化。通知、添付ファイル処理、ラベル管理まで対応します。
  ctas:
    - label: 今すぐ始める
      href: /signup
      variant: primary
    - label: 詳細を見る
      href: /docs/gmail
      variant: secondary
useCases:
  title: 主な用途
  items:
    - title: 自動メール送信
      description: スケジュールに基づいて自動でメールを送信します。
      icon: ✉️
    - title: 受信通知
      description: 重要なメールを受信したらSlackやTeamsに通知します。
      icon: 🔔
    - title: 添付ファイル処理
      description: メールの添付ファイルを自動でダウンロード・保存します。
      icon: 📎
capabilities:
  title: 機能一覧
  operations:
    - メール送信
    - メール検索
    - ラベル追加・削除
    - スレッド管理
  triggers:
    - 新規メール受信
    - ラベル変更
    - スレッド更新
relatedApps:
  title: 関連アプリ
  items:
    - slug: slack
      reason: Gmailの通知をSlackに送信できます
    - slug: google-drive
      reason: 添付ファイルをGoogle Driveに自動保存
faq:
  title: よくある質問
  items:
    - q: 無料で使えますか？
      a: はい、基本的な機能は無料でご利用いただけます。高度な機能は有料プランでご利用いただけます。
    - q: セキュリティは大丈夫ですか？
      a: OAuth 2.0を使用しており、パスワードは保存しません。すべての通信は暗号化されています。
articles:
  title: 関連記事
  items:
    - title: Gmail連携の始め方
      href: /articles/gmail-getting-started
    - title: メール自動化のベストプラクティス
      href: /articles/gmail-best-practices
---

## Gmail連携について

Gmail連携により、メールの送受信を自動化できます。

### 主な機能

- **自動送信**: スケジュールやイベントに基づいてメールを自動送信
- **受信通知**: 重要なメールを受信したら即座に通知
- **添付ファイル処理**: 添付ファイルを自動でクラウドストレージに保存

### セットアップ方法

1. アカウントにログイン
2. 連携アプリからGmailを選択
3. OAuth認証を完了
4. 自動化ルールを設定

以上で設定完了です。
