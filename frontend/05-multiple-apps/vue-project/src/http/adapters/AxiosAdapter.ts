import axios from "axios";
import HttpClient from "../HttpClient";

class AxiosAdapter implements HttpClient {
  async get(url: string) {
    const res = await axios.get(url);

    return res.data;
  }
}

export default AxiosAdapter;
