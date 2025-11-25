import axios from 'axios';

const BASE_URL = 'http://localhost:8787';

console.log('🧪 Testing DramaBox API on Cloudflare Workers...\n');

async function testAPI() {
  try {
    // Test 1: Root endpoint
    console.log('1️⃣ Testing root endpoint...');
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint:', rootResponse.data.message);
    
    // Test 2: Drama list
    console.log('\n2️⃣ Testing drama list...');
    const dramaListResponse = await axios.get(`${BASE_URL}/api/drama/list?pageNo=1`);
    console.log(`✅ Drama list: Retrieved ${dramaListResponse.data.data.books?.length || 0} books`);
    
    // Test 3: Categories
    console.log('\n3️⃣ Testing categories...');
    const categoriesResponse = await axios.get(`${BASE_URL}/api/drama/categories`);
    console.log(`✅ Categories: Retrieved ${categoriesResponse.data.data?.length || 0} categories`);
    
    // Test 4: Recommended books
    console.log('\n4️⃣ Testing recommended books...');
    const recommendedResponse = await axios.get(`${BASE_URL}/api/drama/recommended`);
    console.log(`✅ Recommended: Retrieved ${recommendedResponse.data.total} items`);
    
    // Test 5: Search hot list
    console.log('\n5️⃣ Testing hot search list...');
    const hotSearchResponse = await axios.get(`${BASE_URL}/api/search/hot`);
    console.log(`✅ Hot search: Retrieved ${hotSearchResponse.data.total} items`);
    
    // Test 6: Search with keyword
    console.log('\n6️⃣ Testing search with keyword...');
    const searchResponse = await axios.get(`${BASE_URL}/api/search?keyword=drama`);
    console.log(`✅ Search results for "drama": ${searchResponse.data.total} results`);
    
    console.log('\n✨ All tests passed successfully!');
    console.log('🚀 Your DramaBox API is ready for Cloudflare Workers deployment!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    console.log('\n⚠️  Make sure the Workers dev server is running:');
    console.log('    npm run dev');
  }
}

// Run tests
testAPI();
