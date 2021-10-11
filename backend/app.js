// Spotify World Tour express backend
const express = require("express");
const app = express();

// Routes
const musicRoutes = require("./Routes/musicRoutes.js");

// Middlewares
app.use(express.json());
app.use("/music", musicRoutes);

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
