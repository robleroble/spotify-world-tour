const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  redirect_URI,
} = require("../config");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: redirect_URI,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
