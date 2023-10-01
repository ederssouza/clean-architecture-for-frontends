interface HttpClient {
  get: <T>(url: string) => Promise<T>;
}

export default HttpClient;
