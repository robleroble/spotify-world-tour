const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
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
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/test", (req, res) => {
  console.log("it's going");
  return res.json({ sucess: "true" });
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
    console.log(req.user);
    res.redirect("http://localhost:3001/");
  }
);

module.exports = router;
