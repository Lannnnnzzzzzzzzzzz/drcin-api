# DramaBox API - Cloudflare Workers Deployment Guide

## 🚀 Overview

This project has been configured to deploy to Cloudflare Workers, providing a serverless, globally distributed API with automatic scaling.

## 📋 Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Node.js**: Version 16 or higher
3. **Wrangler CLI**: Installed via npm (already included in dependencies)

## 🛠️ Project Structure

```
DramaBox-API2/
├── src/
│   ├── worker.js           # Main Workers entry point
│   ├── routes/
│   │   ├── drama.js        # Drama endpoints
│   │   ├── chapter.js      # Chapter endpoints
│   │   └── search.js       # Search endpoints
│   └── lib/                # Library files
├── dramabox/               # Core API logic
├── wrangler.toml           # Workers configuration
├── .dev.vars               # Local environment variables
├── package.json            # Dependencies and scripts
└── server.js               # Original Express server (for reference)
```

## 🔧 Configuration

### 1. Cloudflare Account Setup

```bash
# Login to Cloudflare (first time only)
npx wrangler login
```

### 2. Environment Variables

For local development, edit `.dev.vars`:
```env
# Add any environment variables here
PORT=3000
NODE_ENV=development
```

For production, use Wrangler secrets:
```bash
npx wrangler secret put API_KEY
# Enter the secret value when prompted
```

### 3. Domain Configuration (Optional)

Edit `wrangler.toml` to add your custom domain:
```toml
[env.production]
workers_dev = false
routes = [
  { pattern = "api.yourdomain.com/*", zone_id = "YOUR_ZONE_ID" }
]
```

## 🚀 Development

### Local Development Server

```bash
# Start local development server (port 8787 by default)
npm run dev

# The API will be available at:
# http://localhost:8787
```

### Test Endpoints Locally

```bash
# Test root endpoint
curl http://localhost:8787/

# Test drama list
curl http://localhost:8787/api/drama/list?pageNo=1

# Test search
curl http://localhost:8787/api/search?keyword=drama
```

### Local Development with Node.js (Alternative)

If you need to test with the original Express server:
```bash
npm run dev:node
```

## 📦 Deployment

### Deploy to Workers (Development)

```bash
# Deploy to workers.dev subdomain
npm run deploy

# Your API will be available at:
# https://dramabox-api.<your-subdomain>.workers.dev
```

### Deploy to Production

```bash
# Deploy to production environment
npm run deploy:production

# If configured with custom domain:
# https://api.yourdomain.com
```

### View Logs

```bash
# Stream live logs from your Worker
npm run tail
```

## 🌍 API Endpoints

All endpoints from the original Express server are available:

### Drama Endpoints
- `GET /api/drama/list` - Get drama list
- `GET /api/drama/categories` - Get categories
- `GET /api/drama/category/:typeTwoId` - Get books from category
- `GET /api/drama/recommended` - Get recommended books
- `GET /api/drama/:bookId` - Get drama detail
- `GET /api/drama/:bookId/v2` - Get drama detail v2

### Chapter Endpoints
- `GET /api/chapter/:bookId` - Get chapters
- `POST /api/chapter/batch-download` - Batch download chapters

### Search Endpoints
- `GET /api/search?keyword=...` - Search drama
- `GET /api/search/hot` - Get hot search list

## 🔍 Troubleshooting

### Common Issues

1. **Wrangler not found**
   ```bash
   npm install
   ```

2. **Authentication error**
   ```bash
   npx wrangler login
   ```

3. **Module not found errors**
   - Ensure all imports use `.js` extensions
   - Check that `node_compat = true` is in `wrangler.toml`

4. **Crypto errors**
   - The project uses Web Crypto API for Workers compatibility
   - Original Node.js crypto functions are replaced in `dramaboxHelper-workers.js`

### Debug Mode

Enable verbose logging:
```bash
WRANGLER_LOG=debug npm run dev
```

## 🎯 Performance Tips

1. **Caching**: Workers automatically cache at edge locations
2. **KV Storage**: For persistent data, use Cloudflare KV (not implemented yet)
3. **Durable Objects**: For stateful applications (not needed for this API)

## 🔒 Security

1. **API Keys**: Use `wrangler secret` for sensitive data
2. **CORS**: CORS headers are configured in `src/worker.js`
3. **Rate Limiting**: Can be added via Cloudflare dashboard

## 📊 Monitoring

1. **Analytics**: View in Cloudflare dashboard
2. **Logs**: Use `npm run tail` or Cloudflare dashboard
3. **Errors**: Automatic error tracking in Workers analytics

## 🆘 Support

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/cli-wrangler/)
- [Workers Examples](https://github.com/cloudflare/workers-examples)

## 📝 Migration Notes

This project was migrated from Express.js to Cloudflare Workers with the following changes:

1. **Router**: Express → itty-router (lightweight Workers-compatible router)
2. **Crypto**: Node.js crypto → Web Crypto API
3. **Environment**: process.env → Workers env bindings
4. **Deployment**: Traditional hosting → Edge computing

The original Express server (`server.js`) is preserved for reference and can still be run locally using `npm run dev:node`.
