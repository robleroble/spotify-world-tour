const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PORT } = require("./config");

const redirectURI =
  process.env.REDIRECT_URI || "http://localhost:3000/auth/spotify/callback";

passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: redirectURI,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, expires_in, profile, done) {
      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
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
