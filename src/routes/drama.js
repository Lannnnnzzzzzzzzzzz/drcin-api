import {
  getDramaList,
  getCategories,
  getBookFromCategories,
  getRecommendedBooks,
  getDramaDetail,
  getDetailsv2
} from '../../dramabox/index.js';

export function handleDramaRoutes(router, jsonResponse, errorResponse) {
  // Get drama list
  router.get('/api/drama/list', async (request) => {
    try {
      const url = new URL(request.url);
      const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
      const log = url.searchParams.get('log') === 'true';
      
      const data = await getDramaList(pageNo, log);
      
      return jsonResponse({
        success: true,
        data,
        page: pageNo
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get categories
  router.get('/api/drama/categories', async (request) => {
    try {
      const url = new URL(request.url);
      const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
      
      const data = await getCategories(pageNo);
      
      return jsonResponse({
        success: true,
        data,
        page: pageNo
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get books from category
  router.get('/api/drama/category/:typeTwoId', async (request) => {
    try {
      const typeTwoId = parseInt(request.params.typeTwoId);
      const url = new URL(request.url);
      const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
      
      const data = await getBookFromCategories(typeTwoId, pageNo);
      
      return jsonResponse({
        success: true,
        data,
        categoryId: typeTwoId,
        page: pageNo
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get recommended books
  router.get('/api/drama/recommended', async (request) => {
    try {
      const url = new URL(request.url);
      const log = url.searchParams.get('log') === 'true';
      
      const data = await getRecommendedBooks(log);
      
      return jsonResponse({
        success: true,
        data,
        total: data.length
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get drama detail
  router.get('/api/drama/:bookId', async (request) => {
    try {
      const bookId = request.params.bookId;
      const url = new URL(request.url);
      const needRecommend = url.searchParams.get('needRecommend') === 'true';
      
      const data = await getDramaDetail(bookId, needRecommend);
      
      return jsonResponse({
        success: true,
        data,
        bookId
      });
    } catch (error) {
      return errorResponse(error);
    }
  });

  // Get drama detail v2
  router.get('/api/drama/:bookId/v2', async (request) => {
    try {
      const bookId = request.params.bookId;
      
      const data = await getDetailsv2(bookId);
      
      return jsonResponse({
        success: true,
        data,
        bookId
      });
    } catch (error) {
      return errorResponse(error);
    }
  });
}
