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
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, expires_in, profile, done) {
      // janky way to add tokens to my user/profile object
      // req.session.accessToken = accessToken;
      // req.session.refreshToken = refreshToken;
      // console.log(req.session);
      let user = { ...profile, accessToken, refreshToken };
      // let session = { accessToken, refreshToken };
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
