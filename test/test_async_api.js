const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://localhost:3333/async';

async function testAsyncRoutes() {
  try {
    // 测试获取所有书籍
    const allBooks = await axios.get(`${BASE_URL}`);
    console.log('All books:', allBooks.data);
    assert(Array.isArray(allBooks.data), 'Should return an array of books');
    
    // 测试通过ISBN获取书籍
    const bookByIsbn = await axios.get(`${BASE_URL}/isbn/1`);
    console.log('Book by ISBN:', bookByIsbn.data);
    assert(bookByIsbn.data.title, 'Should return a book with title');
    
    // 测试通过作者获取书籍
    const booksByAuthor = await axios.get(`${BASE_URL}/author/Chinua Achebe`);
    console.log('Books by author:', booksByAuthor.data);
    assert(Object.keys(booksByAuthor.data).length > 0, 'Should return books by author');
    
    // 测试通过标题获取书籍
    const booksByTitle = await axios.get(`${BASE_URL}/title/Things Fall Apart`);
    console.log('Books by title:', booksByTitle.data);
    assert(Object.keys(booksByTitle.data).length > 0, 'Should return books by title');
    
    console.log('All async route tests passed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAsyncRoutes();