const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // get the list of all books
  titles = Object.keys(books).map((key) => books[key].title);
  // alternatively, you can use Object.values(books).map((book) => book.title);
  // or Object.entries(books).map(([key, book]) => book.title);
  res.send(JSON.stringify(titles, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // get the book details based on ISBN
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn], null, 4));
  } else {
    res.status(404).send("Book not found");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // filter the books based on author
  const author = req.params.author;
  const filteredBooks = Object.entries(books).filter(([key, book]) => book.author === author);
  if (filteredBooks.length > 0) {
    const result = Object.fromEntries(filteredBooks);
    res.send(JSON.stringify(result, null, 4));
  } else {
    res.status(404).send("No books found by this author");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // filter the books based on title
  const title = req.params.title;
  const filteredBooks = Object.entries(books).filter(([key, book]) => book.title === title);
  if (filteredBooks.length > 0) {
    const result = Object.fromEntries(filteredBooks);
    res.send(JSON.stringify(result, null, 4));
  } else {
    res.status(404).send("No books found with this title");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // get the book review based on ISBN
  const isbn = req.params.isbn;
  // test if the book exists
  if (books[isbn]) {
    const reviews = books[isbn].reviews;
    if (Object.keys(reviews).length > 0) {
      res.send(JSON.stringify(reviews, null, 4));
    } else {
      res.status(404).send("No reviews found for this book");
    }
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports.general = public_users;

