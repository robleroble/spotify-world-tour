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
  "BQD8JR_F2o49rlCUtdrNHfdPkCERq0WTZDT1hWTUy7zMnzJ93mfjF53AkAZ9BaPeB8JtZxou4BDBckL8hk8";

class SpotifyApiCaller {
  static token;

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

  static async getFeaturedPlaylists(data) {
    let paramsArr = [];
    for (const [key, value] of Object.entries(data)) {
      paramsArr.push(`${key}=${value}`);
    }
    let params = paramsArr.join("&");
    console.log(params);

    const url = `https://api.spotify.com/v1/browse/featured-playlists?${params}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
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
