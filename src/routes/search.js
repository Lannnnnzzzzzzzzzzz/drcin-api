import {
  searchDrama,
  searchDramaIndex
} from '../../dramabox/index.js';

export function handleSearchRoutes(router, jsonResponse, errorResponse) {
  // Search drama
  router.get('/api/search', async (request) => {
    try {
      const url = new URL(request.url);
      const keyword = url.searchParams.get('keyword');
      const log = url.searchParams.get('log') === 'true';
      
      if (!keyword) {
        return jsonResponse({
          success: false,
          error: 'Keyword is required'
        }, 400);
      }
      
      const data = await searchDrama(keyword, log);
      
      return jsonResponse({
        success: true,
        data,
        keyword,
        total: data.length
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get hot search list
  router.get('/api/search/hot', async (request) => {
    try {
      const url = new URL(request.url);
      const log = url.searchParams.get('log') === 'true';
      
      const data = await searchDramaIndex(log);
      
      return jsonResponse({
        success: true,
        data,
        total: data.length
      });
    } catch (error) {
      return errorResponse(error);
    }
  });
}
