const express = require("express");
const router = express.Router();
const passport = require("passport");
const SpotifyApiCaller = require("../SpotifyAPICaller");
const { PORT } = require("../config");

const login_redirect =
  process.env.LOGIN_REDIRECT || "http://localhost:3001/browse";

router.get("/client-credentials", async function (req, res, next) {
  try {
    const clientCredentialsToken =
      await SpotifyApiCaller.getClientCredentialsToken();
    return res.json({ clientCredentialsToken });
  } catch (err) {
    return next(err);
  }
});

router.get("/login/success", (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
      });
    }
  } catch (err) {
    return next(err);
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
  req.logout();
  res.clearCookie("sid", { path: "/" });
  res.redirect("/");
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
    res.redirect(login_redirect);
  }
);

module.exports = router;
