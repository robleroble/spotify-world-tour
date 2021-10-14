const axios = require("axios");
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require("./config");

const BASE_64_CLIENT_CREDENTIALS =
  "MWMyZmFhNWUwMjU4NDRjZTg0YjNmZTMxMDUyYTVkNzA6NDcwNzliNTEwYTI5NDRkZWE0NTE5NTlmMDUxZWQwYTc=";

const BASE_URL = "https://api.spotify.com/v1";

/** Spotify API caller class
 *
 * Static class with methods to call Spotify API
 *
 */

const access_token =
  "BQCrjFo1O5z0dIj44stFkBwi93gH5qJY9IONvVYiwpLw2i00Pxh6Cm3mWSJK1IxeG4iPLvxHAAdoLp9y3rc";

class SpotifyApiCaller {
  // static access_token;

  // client credentials token
  static async getClientCredentialsToken() {
    const url = "https://accounts.spotify.com/api/token";
    const method = "POST";
    const data = "grant_type=client_credentials";
    const headers = {
      Authorization: `Basic ${BASE_64_CLIENT_CREDENTIALS}`,
    };
    return (await axios({ url, method, data, headers })).data;
  }

  static async getFeaturedPlaylist(country, offset) {
    const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return (await axios({ url, method, headers })).data;
  }

  static async getPlaylistByCategory(country, category_id, offset) {
    const url = `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?country=${country}&offset=${offset}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    console.log(url);
    return (await axios({ url, method, headers })).data;
  }

  static async getAlbumNewReleases(country, offset) {
    const url = `https://api.spotify.com/v1/browse/new-releases?country=${country}&offset=${offset}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    console.log(url);
    return (await axios({ url, method, headers })).data;
  }

  static async getPlaylistTracks(playlistID) {
    console.log(playlistID);
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return (await axios({ url, method, headers })).data;
  }
}

SpotifyApiCaller.token =
  "BQDXSoY9I3hz5QeS27WwvgiChATCkrKKvQv8jGGA9frnarslste7zTEg8dWsE6rHw8HvsodVTaTrbUqWxYvsTVIQFIH0Oeu1NBzQLgEm73ilsaR5blrp8E3I7QVG_Xebpc1nwzXCY3tecw";

module.exports = SpotifyApiCaller;
