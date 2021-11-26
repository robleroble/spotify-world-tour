import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

class SWTApi {
  static ccToken;
  static userToken;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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
    const url = `http://localhost:3000/music`;
    const method = "POST";
    let res = await axios({ url, method });
    // let res = await this.request("music");
    // console.log("SWTApi");
    // console.log(res);
    return res;
  }
}

export default SWTApi;
