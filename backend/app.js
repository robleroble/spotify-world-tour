// Spotify World Tour express backend
const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");

// spotify auth stuff
// const session = require("express-session");
const session = require("cookie-session");
const SpotifyStrategy = require("passport-spotify").Strategy;
const consolidate = require("consolidate");
require("dotenv").config();

const corsOrigin = process.env.CORS_PROD_ORIGIN || "http://localhost:3001";

// Middlewares
app.use(
  cors({
    origin: corsOrigin,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
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
const userRoutes = require("./Routes/userRoutes");

app.use("/music", musicRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
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
