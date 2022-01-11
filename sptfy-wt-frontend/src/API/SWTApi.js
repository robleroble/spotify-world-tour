import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.withCredentials = true;

class SWTApi {
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async loginUser() {
    const url = `${BASE_URL}/auth/login/success`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    };
    let res = await axios({ url, method, headers });
    console.log(res);
    return res.data.user;
  }

  static async logoutUser() {
    const url = `${BASE_URL}/auth/logout`;
    const method = "GET";
    let res = await axios({ url, method });
    return;
  }

  static async getCCToken() {
    const url = `${BASE_URL}/auth/client-credentials`;
    const method = "GET";
    let res = await axios({ url, method });
    const token = res.data.clientCredentialsToken.access_token;
    return token;
  }

  static async getAlbum(accessToken, country) {
    const url = `${BASE_URL}/music/get-album`;
    const method = "post";
    const data = {
      country,
      accessToken,
    };
    let res = await axios({ url, method, data });
    return res.data.albums.albums;
  }

  static async getFeaturedPlaylist(accessToken, country) {
    const url = `${BASE_URL}/music/get-featured-playlists`;
    const method = "POST";
    const data = {
      country,
      accessToken,
    };
    let res = await axios({ url, method, data });
    return res.data;
  }

  static async getCategories(accessToken, country) {
    const url = `${BASE_URL}/music/get-playlist-categories`;
    const method = "POST";
    const data = {
      accessToken,
      country,
    };
    let res = await axios({ url, method, data });
    return res.data;
  }

  static async getPlaylistsByCategory(accessToken, country, categoryId) {
    const url = `${BASE_URL}/music/get-playlist-by-genre`;
    const method = "POST";
    const data = {
      accessToken,
      country,
      categoryId,
    };
    let res = await axios({ url, method, data });
    return res.data;
  }

  static async checkIfPlaylistFollowed(accessToken, playlistId, userId) {
    const url = `${BASE_URL}/users/followed-playlists`;
    const method = "POST";
    const data = {
      accessToken,
      playlistId,
      userId,
    };
    let res = await axios({ url, method, data });
    return res.data;
  }
}

export default SWTApi;
