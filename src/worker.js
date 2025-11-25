import { Router } from 'itty-router';
import { handleDramaRoutes } from './routes/drama.js';
import { handleChapterRoutes } from './routes/chapter.js';
import { handleSearchRoutes } from './routes/search.js';

// Create router instance
const router = Router();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// Helper function to create JSON response with CORS
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders
  });
}

// Helper function to handle errors
function errorResponse(error, status = 500) {
  console.error('API Error:', error);
  return jsonResponse({
    success: false,
    error: error.message || 'Internal server error'
  }, status);
}

// Middleware to handle CORS preflight
router.options('*', () => {
  return new Response(null, {
    headers: corsHeaders
  });
});

// Root endpoint
router.get('/', () => {
  return jsonResponse({
    message: 'DramaBox API Server (Cloudflare Workers)',
    version: '1.0.0',
    endpoints: {
      drama: {
        list: 'GET /api/drama/list',
        categories: 'GET /api/drama/categories',
        categoryBooks: 'GET /api/drama/category/:typeTwoId',
        recommended: 'GET /api/drama/recommended',
        detail: 'GET /api/drama/:bookId',
        detailV2: 'GET /api/drama/:bookId/v2'
      },
      chapter: {
        list: 'GET /api/chapter/:bookId',
        batchDownload: 'POST /api/chapter/batch-download'
      },
      search: {
        query: 'GET /api/search',
        hotList: 'GET /api/search/hot'
      }
    }
  });
});

// Register route handlers
handleDramaRoutes(router, jsonResponse, errorResponse);
handleChapterRoutes(router, jsonResponse, errorResponse);
handleSearchRoutes(router, jsonResponse, errorResponse);

// 404 handler
router.all('*', (request) => {
  return jsonResponse({
    success: false,
    error: 'Endpoint not found',
    path: new URL(request.url).pathname
  }, 404);
});

// Export default handler for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    try {
      // Add environment context to request
      request.env = env;
      request.ctx = ctx;
      
      return await router.handle(request);
    } catch (error) {
      return errorResponse(error);
    }
  }
};
