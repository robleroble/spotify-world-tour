const express = require("express");
const router = express.Router();
const SpotifyApiCaller = require("../SpotifyAPICaller");

router.post("/get-album", async function (req, res, next) {
  try {
    const { country, accessToken } = req.body;

    const albums = await SpotifyApiCaller.getAlbumNewReleases(
      country,
      accessToken
    );
    return res.json({ albums });
  } catch (err) {
    return next(err);
  }
});

router.post("/get-featured-playlists", async function (req, res, next) {
  try {
    const { country, accessToken } = req.body;
    const playlists = await SpotifyApiCaller.getFeaturedPlaylists(
      country,
      accessToken
    );
    return res.json({ playlists });
  } catch (err) {
    return next(err);
  }
});

router.post("/get-playlist-categories", async function (req, res, next) {
  try {
    const { country, accessToken } = req.body;
    const categories = await SpotifyApiCaller.getBrowseCategories(
      accessToken,
      country
    );
    // console.log("categories");
    // console.log(categories);
    return res.json({ categories });
  } catch (err) {
    return next(err);
  }
});

router.post("/get-playlist-by-genre", async function (req, res, next) {
  try {
    const { country, categoryId, accessToken } = req.body;
    const playlists = await SpotifyApiCaller.getPlaylistByCategory(
      country,
      categoryId,
      accessToken
    );
    return res.json({ playlists });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
