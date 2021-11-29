const express = require("express");
const router = express.Router();
const SpotifyApiCaller = require("../SpotifyAPICaller");

// need to transfer this to auth routes
router.post("/", async function (req, res, next) {
  const q = req.query;
  try {
    // pass query/body args to model to get music
    const ccToken = await SpotifyApiCaller.getClientCredentialsToken();
    return res.json({ ccToken });
  } catch (err) {
    console.log("error");
    return next(err);
  }
});

router.post("/get-album", async function (req, res, next) {
  try {
    const { country, accessToken } = req.body;

    const offset = Math.floor(Math.random() * 20) + 1;
    let albums = await SpotifyApiCaller.getAlbumNewReleases(
      country,
      offset,
      accessToken
    );
    return res.json({ albums });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
