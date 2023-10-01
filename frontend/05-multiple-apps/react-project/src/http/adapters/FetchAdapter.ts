import HttpClient from "../HttpClient";

class FetchAdapter implements HttpClient {
  async get(url: string) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }
}

export default FetchAdapter;
