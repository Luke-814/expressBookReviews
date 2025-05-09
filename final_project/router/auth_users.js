const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
let users = [];

const authenticated = express.Router();

authenticated.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check for missing credentials
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT
  const accessToken = jwt.sign({ username: user.username }, 'access', { expiresIn: '1h' });

  // Save in session
  req.session.authorization = { accessToken };

  return res.status(200).json({ message: "Login successful", token: accessToken });
});

module.exports.authenticated = authenticated;
module.exports.users = users;
module.exports.isValid = (username) => {
  // Optional helper for future tasks
  return users.some(user => user.username === username);
};
