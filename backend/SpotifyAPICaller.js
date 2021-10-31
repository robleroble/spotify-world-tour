const axios = require("axios");
const { BASE_64_CLIENT_CREDENTIALS } = require("./config");

const BASE_URL = "https://api.spotify.com/v1";

/** Spotify API caller class
 *
 * Static class with methods to call Spotify API
 *
 */

// client credentials token for temp access to API
const access_token =
  "BQDnY18dZzDU0nOwrd8WgrcG94hZeHnbpra3XeqB2Y2qQWaneA4SaEclVjXNHKHJFwEH1T3a3pH_iMya3jo";

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
    console.log(BASE_64_CLIENT_CREDENTIALS);
    return (await axios({ url, method, data, headers })).data;
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
