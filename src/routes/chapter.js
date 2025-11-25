import {
  getChapters,
  batchDownload
} from '../../dramabox/index.js';

export function handleChapterRoutes(router, jsonResponse, errorResponse) {
  // Get chapters
  router.get('/api/chapter/:bookId', async (request) => {
    try {
      const bookId = request.params.bookId;
      const url = new URL(request.url);
      const log = url.searchParams.get('log') === 'true';
      
      const data = await getChapters(bookId, log);
      
      return jsonResponse({
        success: true,
        data,
        bookId,
        total: data.length
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Batch download chapters
  router.post('/api/chapter/batch-download', async (request) => {
    try {
      const body = await request.json();
      const { bookId, chapterIdList } = body;
      
      if (!bookId || !chapterIdList || !Array.isArray(chapterIdList)) {
        return jsonResponse({
          success: false,
          error: 'Invalid request. Requires bookId and chapterIdList array'
        }, 400);
      }
      
      const data = await batchDownload(bookId, chapterIdList);
      
      return jsonResponse({
        success: true,
        data,
        bookId,
        chaptersCount: chapterIdList.length
      });
    } catch (error) {
      return errorResponse(error);
    }
  });
}
