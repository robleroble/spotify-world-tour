const express = require("express");
const router = express.Router();
const SpotifyApiCaller = require("../SpotifyAPICaller");

router.post("/", async function (req, res, next) {
  //destructure args??? or just pass all directly into model func
  const q = req.query;
  try {
    // pass query/body args to model to get music
    console.log("working?");
    const music = await SpotifyApiCaller.getClientCredentialsToken();
    console.log("not working");
    // return res.json({music})
    return res.json({ music });
  } catch (err) {
    console.log("error");
    return next(err);
  }
});

module.exports = router;
