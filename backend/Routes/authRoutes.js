const express = require("express");
const router = express.Router();
const passport = require("passport");
const SpotifyApiCaller = require("../SpotifyAPICaller");
const { PORT } = require("../config");

router.get("/client-credentials", async function (req, res) {
  try {
    const clientCredentialsToken =
      await SpotifyApiCaller.getClientCredentialsToken();
    return res.json({ clientCredentialsToken });
  } catch (err) {
    return next(err);
  }
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  console.log("logged out");
  req.session.destroy();
  req.logout();
});

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    showDialog: true,
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/login/failed",
  }),
  function (req, res) {
    // development mode
    res.redirect("http://localhost:3001/browse");
    // production mode
    // res.redirect("https://spotify-world-tour.netlify.app/browse");
  }
);

module.exports = router;
