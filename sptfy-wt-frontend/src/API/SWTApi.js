import axios from "axios";

// development mode
// const BASE_URL = "http://localhost:3000";
// production mode
const BASE_URL = "https://spotify-world-tour.herokuapp.com";

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
