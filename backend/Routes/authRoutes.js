const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  //   res.send(`Hello world ${req.user.displayName}`);
  res.send("Hello there!");
});

router.get("/error", (req, res) => res.send("Unknown Error"));

router.get("/spotify", passport.authenticate("spotify"));

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
