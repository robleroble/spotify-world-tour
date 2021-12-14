const axios = require("axios");
const { BASE_64_CLIENT_CREDENTIALS } = require("./config");

const BASE_URL = "https://api.spotify.com/v1";

/** Spotify API caller class
 *
 * Static class with methods to call Spotify API
 *
 */

class SpotifyApiCaller {
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

  static async getAlbumNewReleases(country, offset, accessToken) {
    const url = `${BASE_URL}/browse/new-releases?country=${country}&offset=${offset}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return (await axios({ url, method, headers })).data;
  }

  static async getAlbumTracks(albumId, accessToken) {
    const url = `${BASE_URL}/albums/${albumId}/tracks`;
    console.log(url);
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = (await axios({ url, method, headers })).data;
    // console.log(res);
    return res;
  }

  static async getFeaturedPlaylists(country, accessToken) {
    const url = `${BASE_URL}/browse/featured-playlists?country=${country}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = (await axios({ url, method, headers })).data;
    return res;
  }

  static async getBrowseCategories(accessToken, country) {
    const plainUrl = `${BASE_URL}/browse/categories?limit=50`;
    const countryUrl = `${BASE_URL}/browse/categories?limit=50&country=${country}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let url;
    if (country === null) {
      url = plainUrl;
    } else {
      url = countryUrl;
    }
    const res = (await axios({ url, method, headers })).data;
    return res;
  }

  static async getPlaylistByCategory(country, categoryId, offset, accessToken) {
    const url = `${BASE_URL}/browse/categories/${categoryId}/playlists?country=${country}&offset=${offset}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = (await axios({ url, method, headers })).data;
    console.log(res);
    return res;
  }
}

module.exports = SpotifyApiCaller;
