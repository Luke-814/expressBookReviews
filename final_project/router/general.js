const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    // Add new user to the users array
    users.push({ username, password });
  
    return res.status(201).json({ message: "User registered successfully" });
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 2)); // The 'null, 2' part formats the JSON with indentation
});

public_users.get('/', async function (req, res) {
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving books", error: err.message });
    }
  });
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const book = response.data[isbn];
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching book by ISBN" });
    }
  });
  
// Get book details based on author

public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author.toLowerCase();
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const books = response.data;
      const matchingBooks = Object.values(books).filter(book =>
        book.author.toLowerCase() === author
      );
      if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
      } else {
        res.status(404).json({ message: "No books found by this author" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching books by author" });
    }
  });

// Get all books based on title

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title.toLowerCase();
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const books = response.data;
      const matchingBooks = Object.values(books).filter(book =>
        book.title.toLowerCase() === title
      );
      if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
      } else {
        res.status(404).json({ message: "No books found with this title" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching books by title" });
    }
  });

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
  
    if (book) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });

module.exports.general = public_users;
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    // Add new user to the users array
    users.push({ username, password });
  
    return res.status(201).json({ message: "User registered successfully" });
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 2)); // The 'null, 2' part formats the JSON with indentation
});

public_users.get('/', async function (req, res) {
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving books", error: err.message });
    }
  });
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const book = response.data[isbn];
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching book by ISBN" });
    }
  });
  
// Get book details based on author

public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author.toLowerCase();
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const books = response.data;
      const matchingBooks = Object.values(books).filter(book =>
        book.author.toLowerCase() === author
      );
      if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
      } else {
        res.status(404).json({ message: "No books found by this author" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching books by author" });
    }
  });

// Get all books based on title

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title.toLowerCase();
    try {
      const response = await axios.get('http://localhost:5000/booksdata');
      const books = response.data;
      const matchingBooks = Object.values(books).filter(book =>
        book.title.toLowerCase() === title
      );
      if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
      } else {
        res.status(404).json({ message: "No books found with this title" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching books by title" });
    }
  });

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
  
    if (book) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });

module.exports.general = public_users;
