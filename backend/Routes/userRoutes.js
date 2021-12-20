const express = require("express");
const router = express.Router();
const SpotifyApiCaller = require("../SpotifyAPICaller");

router.post("/followed-playlists", async function (req, res, next) {
  try {
    const { accessToken, playlistId, userId } = req.body;
    const userFollows = await SpotifyApiCaller.followsPlaylist(
      playlistId,
      userId,
      accessToken
    );
    return res.json({ userFollows });
  } catch (err) {
    return next(err);
  }
});

router.post("/follow-playlist", async function (req, res, next) {
  try {
    const { accessToken, playlistId } = req.body;
    const followPlaylist = await SpotifyApiCaller.followPlaylist(
      playlistId,
      accessToken
    );
    return res.json({ followPlaylist });
  } catch (err) {
    return next(err);
  }
});

router.post("/unfollow-playlist", async function (req, res, next) {
  try {
    const { accessToken, playlistId } = req.body;
    const unfollowPlaylist = await SpotifyApiCaller.followPlaylist(
      playlistId,
      accessToken
    );
    return res.json({ unfollowPlaylist });
  } catch (err) {
    return next(err);
  }
});

router.post("/saved-albums", async function (req, res, next) {
  try {
    const { accessToken, albumId } = req.body;
    const savedAlbums = await SpotifyApiCaller.checkSavedAlbums(
      albumId,
      accessToken
    );
    return res.json({ savedAlbums });
  } catch (err) {
    return next(err);
  }
});

router.post("/save-album", async function (req, res, next) {
  try {
    const { accessToken, albumId } = req.body;
    const savedAlbum = await SpotifyApiCaller.saveAlbum(albumId, accessToken);
    return res.json({ savedAlbum });
  } catch (err) {
    return next(err);
  }
});

router.post("/remove-album", async function (req, res, next) {
  try {
    const { accessToken, albumId } = req.body;
    const removedAlbum = await SpotifyApiCaller.removeAlbum(
      albumId,
      accessToken
    );
    return res.json({ removedAlbum });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
