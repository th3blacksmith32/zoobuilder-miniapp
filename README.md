# ZooBuilder MiniApp - Super Repo (Full Stack)

This repo contains a full-stack Telegram Mini App ready for one-click deploy to Vercel or other platforms.

## One-click deploy to Vercel
1. Push this repo to GitHub: e.g. https://github.com/yourname/zoobuilder-miniapp
2. Click deploy: https://vercel.com/new/clone?repository-url=https://github.com/yourname/zoobuilder-miniapp

After deploying, set environment variable `BOT_TOKEN` in Vercel dashboard.

## Structure
- frontend/ -> Telegram WebApp UI (index.html)
- api/ -> serverless endpoints (auth, save, load, purchase, server.js)
- vercel.json -> Vercel config
- Dockerfile, docker-compose.yml -> local/full deployments
- db_schema.sql -> Postgres schema
- TON_integration.md, Stars_integration.md -> payment integration guides
- figma_mockups/ -> PNG mockups for main screens

## BotFather / Telegram setup
- In BotFather, set your domain and create a Web App button in an inline keyboard:
```json
{ "text":"Play ZooBuilder", "web_app": { "url":"https://YOUR_DEPLOYMENT_URL" } }
```

## Notes
- This is a demo scaffold. Replace mock DB with real DB and secure your endpoints.