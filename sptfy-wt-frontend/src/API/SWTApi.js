import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

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
    console.log("playlists");
    console.log(res.data);
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
    console.log("API get playlists by category");
    const url = `${BASE_URL}/music/get-playlist-by-genre`;
    const method = "POST";
    const data = {
      accessToken,
      country,
      categoryId,
    };
    let res = await axios({ url, method, data });
    console.log(res.data);
    return res.data;
  }
}

export default SWTApi;
