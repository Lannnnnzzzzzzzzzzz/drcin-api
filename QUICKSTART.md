# 🚀 DramaBox API - Cloudflare Workers Quick Start

## ⚡ Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Login to Cloudflare (First Time Only)
```bash
npx wrangler login
```

### Step 3: Start Development Server
```bash
npm run dev
```

Your API is now running at: **http://localhost:8787**

## 🧪 Test Your API

Open a new terminal and run:
```bash
node test-workers-api.js
```

## 🚀 Deploy to Cloudflare

### Deploy to Development Environment
```bash
npm run deploy
```

Your API will be available at: `https://dramabox-api.<your-subdomain>.workers.dev`

### Deploy to Production
```bash
npm run deploy:production
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run deploy` | Deploy to workers.dev subdomain |
| `npm run deploy:production` | Deploy to production |
| `npm run tail` | View live logs from your Worker |
| `npm run dev:node` | Run original Express server (fallback) |

## 🔗 API Endpoints

Test these endpoints in your browser or with curl:

- **Root**: http://localhost:8787/
- **Drama List**: http://localhost:8787/api/drama/list?pageNo=1
- **Categories**: http://localhost:8787/api/drama/categories
- **Recommended**: http://localhost:8787/api/drama/recommended
- **Hot Search**: http://localhost:8787/api/search/hot

## 💡 Tips

- The API is now serverless and will scale automatically
- No need to manage servers or infrastructure
- Deployed globally on Cloudflare's edge network
- Pay-per-request pricing model

## 🆘 Need Help?

- Check [README-CLOUDFLARE-WORKERS.md](./README-CLOUDFLARE-WORKERS.md) for detailed documentation
- View logs with `npm run tail`
- Test locally with `npm run dev`

---
**Ready to deploy?** Run `npm run deploy` and your API will be live in seconds! 🎉
