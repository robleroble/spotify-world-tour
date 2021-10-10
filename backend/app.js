// Spotify World Tour express backend
const express = require("express");
const app = express();

// can't remember what this is used for
app.use(express.json());

// 404 Handler

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
});

// General Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: error,
    message: error.message,
  });
});

module.exports = app;
