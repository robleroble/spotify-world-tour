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
    // let res = await this.request("music");
    console.log("cctoken");
    // console.log(res);
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
    // console.log(res.data.albums.albums);
    return res.data.albums.albums;
  }
}

export default SWTApi;
