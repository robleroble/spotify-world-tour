const express = require("express");
const router = express.Router();
const SpotifyApiCaller = require("../SpotifyAPICaller");
const passport = require("passport");

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
    const albums = await SpotifyApiCaller.getAlbumNewReleases(
      country,
      offset,
      accessToken
    );
    // console.log(albums.albums.items[0].id);

    const albumId = albums.albums.items[0].id;
    // const albumId = "39g3CsFBc9YK9Z6AbvvkgF";
    // console.log("album id");
    // console.log(albumId);
    const songs = await SpotifyApiCaller.getAlbumTracks(albumId, accessToken);
    console.log(songs);

    return res.json({ albums });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
