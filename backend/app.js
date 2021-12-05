// Spotify World Tour express backend
const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");

// spotify auth stuff
const session = require("express-session");
const SpotifyStrategy = require("passport-spotify").Strategy;
const consolidate = require("consolidate");
require("dotenv").config();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60,
  // },
};

app.use(session(sessionConfig));

/**
 * Passport middlewares
 */

app.use(passport.initialize());
app.use(passport.session());

// Routes
const musicRoutes = require("./Routes/musicRoutes");
const authRoutes = require("./Routes/authRoutes");
// const {
//   SPOTIFY_CLIENT_ID,
//   SPOTIFY_CLIENT_SECRET,
//   redirect_URI,
// } = require("./config");

app.use("/music", musicRoutes);
app.use("/auth", authRoutes);
////////////////////////////////////////////////

// 404 Handler

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
});

// General Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
