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
  "BQDVhZPHDjqPIJl-9DxrYCdCJfwILVjzAbxilNyma7Ar-K4L0NpoJqLPRLIdImY47DqfsE-IEtx0euLRSXo";

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
    // returns all data from call
    // return (await axios({ url, method, headers })).data;

    // returns first playlist's ID
    // return (await axios({ url, method, headers })).data.playlists.items[0].id;

    // returns first playlist's URI
    // return (await axios({ url, method, headers })).data.playlists.items[0].uri;

    // get playlist Tracks
    return this.getPlaylistTracks(
      (await axios({ url, method, headers })).data.playlists.items[0].id
    );
  }

  // This api doesn't seem to necessarily get country-specific music
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
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=20`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return (await axios({ url, method, headers })).data.items;
  }
}

SpotifyApiCaller.token =
  "BQDXSoY9I3hz5QeS27WwvgiChATCkrKKvQv8jGGA9frnarslste7zTEg8dWsE6rHw8HvsodVTaTrbUqWxYvsTVIQFIH0Oeu1NBzQLgEm73ilsaR5blrp8E3I7QVG_Xebpc1nwzXCY3tecw";

module.exports = SpotifyApiCaller;
