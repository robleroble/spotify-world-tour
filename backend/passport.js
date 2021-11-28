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
      // janky way to add tokens to my user/profile object
      let user = { ...profile, accessToken, refreshToken };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
