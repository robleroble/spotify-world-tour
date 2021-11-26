// Spotify World Tour express backend
const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const cors = require("cors");

// spotify auth stuff
const session = require("express-session");
const SpotifyStrategy = require("passport-spotify").Strategy;
const consolidate = require("consolidate");
require("dotenv").config();

// Routes
const musicRoutes = require("./Routes/musicRoutes.js");
const passport = require("passport");
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  redirect_URI,
} = require("./config");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/music", musicRoutes);

/** Passport session setup
 * 
 * https://github.com/JMPerez/passport-spotify/blob/master/examples/login/app.js
 * 
 * To support persistent login sessions, Passport needs to be able to
   serialize users into and deserialize users out of the session. Typically,
   this will be as simple as storing the user ID when serializing, and finding
   the user by ID when deserializing. However, since this example does not
   have a database of user records, the complete spotify profile is serialized
   and deserialized.
 * */
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

/**
 * Use the SpotifyStrategy within Passport.
   Strategies in Passport require a `verify` function, which accept
   credentials (in this case, an accessToken, refreshToken, expires_in
   and spotify profile), and invoke a callback with a user object.
 */
passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: redirect_URI,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        /** To keep the example simple, the user's spotify profile is returned to
           represent the logged-in user. In a typical application, you would want
           to associate the spotify account with a user record in your database,
           and return that user instead.
           */
        return done(null, profile);
      });
    }
  )
);

app.use(session({ secret: "secret" }));

/**
 * Passport middlewares
 */

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  console.log("home test");
  res.send("Home Page");
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  })
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// app.listen(port, function () {
//   console.log("App is listening on port " + port);
// });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

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
