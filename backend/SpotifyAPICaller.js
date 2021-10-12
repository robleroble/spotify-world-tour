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

class SpotifyApiCaller {
  static token;

  // client credentials token
  static async getClientCredentialsToken() {
    const ccDataString = "grant_type=client_credentials";
    const url = "https://accounts.spotify.com/api/token";
    // const method = "post";
    const headers = {
      Authorization: `Basic ${BASE_64_CLIENT_CREDENTIALS}`,
    };
    const method = "POST";
    // const options = {
    //   ccUrl,
    //   method: "POST",
    //   headers: headers,
    //   body: ccDataString,
    // };
    const data = "grant_type=client_credentials";
    return (await axios({ url, method, data, headers })).data;
  }

  static async getFeaturedPlaylists(data) {
    let res = await this.request("/browse/featured-playlists", { data });
    return res;
  }
}

SpotifyApiCaller.token =
  "BQDXSoY9I3hz5QeS27WwvgiChATCkrKKvQv8jGGA9frnarslste7zTEg8dWsE6rHw8HvsodVTaTrbUqWxYvsTVIQFIH0Oeu1NBzQLgEm73ilsaR5blrp8E3I7QVG_Xebpc1nwzXCY3tecw";

module.exports = SpotifyApiCaller;
