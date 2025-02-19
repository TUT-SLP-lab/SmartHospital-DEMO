This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## ToDo

- UIの改善(無限)
- chromeだと動かない問題解決したい
- 医者患者が入力されていないときのエラーハンドリング（アラート出して登録モーダル開く）
- 項目をinput→p or h
- サイドバーにいらないもん集めてみる（表示エリア広くしておまけの機能つけてみたりする？）
- サジェスト型のシステム作る(左右スライドでaccept or reject)
- ユーザ入力を先にフォームで患者はそのまま（送信でユーザIDリセットしない）
- テスト専用リポジトリ作成
- カルテの内容生成から送信
- デザインや使いやすさ
- 複数UIの使用感実験（いったん後）

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 技術スタック

- Next.js 13 (App Router)
- TailwindCSS
- shadcn/ui
