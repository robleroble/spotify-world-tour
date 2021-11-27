const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  redirect_URI,
} = require("./config");

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: redirect_URI,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
