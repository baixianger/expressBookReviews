const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();


// ****** Task 10: Get list of books using async/await ******
// Using async/await with Axios to get all books
public_users.get('/', async function (req, res) {
  try {
    // Simulate async API call (in real case, this would be an actual API endpoint)
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.values(books).map(book => book.title));
      }, 1000); // Simulate network delay
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});

// ****** Task 11: Get book by ISBN using async/await ******
// Using async/await with Axios to get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
    
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// ****** Task 12: Get books by author using async/await ******
// Using async/await with Axios to get books by author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const filteredBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const result = Object.entries(books)
          .filter(([key, book]) => book.author === author)
          .reduce((obj, [key, book]) => {
            obj[key] = book;
            return obj;
          }, {});
        resolve(result);
      }, 1000);
    });
    
    if (Object.keys(filteredBooks).length > 0) {
      res.status(200).json(filteredBooks);
    } else {
      res.status(404).json({message: "No books found by this author"});
    }
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});

// ****** Task 13: Get books by title using async/await ******
// Using async/await with Axios to get books by title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const filteredBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const result = Object.entries(books)
          .filter(([key, book]) => book.title === title)
          .reduce((obj, [key, book]) => {
            obj[key] = book;
            return obj;
          }, {});
        resolve(result);
      }, 1000);
    });
    
    if (Object.keys(filteredBooks).length > 0) {
      res.status(200).json(filteredBooks);
    } else {
      res.status(404).json({message: "No books found with this title"});
    }
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});




module.exports.general_async = public_users;

