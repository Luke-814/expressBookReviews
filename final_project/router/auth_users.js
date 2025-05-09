const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const books = require('./booksdb.js');

let users = [];

const isValid = (username) => {
  return users.some(user => user.username === username);
};

const authenticated = express.Router();

authenticated.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

 
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign({ username: user.username }, 'access', { expiresIn: '1h' });

  req.session.authorization = { accessToken };

  return res.status(200).json({ message: "Login successful", token: accessToken });
});

authenticated.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.user?.username;
  
    if (!review) {
      return res.status(400).json({ message: "Review query is required" });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({ message: "Review added/updated successfully" });
  });

  authenticated.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user?.username;
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    if (books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ message: "No review found for this user" });
    }
  });

module.exports.authenticated = authenticated;
module.exports.users = users;
module.exports.isValid = (username) => {

  return users.some(user => user.username === username);
};
