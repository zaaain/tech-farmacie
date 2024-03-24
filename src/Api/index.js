import axios from "axios";
import AsynStorage from "helpers/asyncLocalStorage";
import history from "utils/history";

export default class Client {

  constructor() {
    this.token = AsynStorage.getItem("jwt");
    this.url = "https://agronomics.vercel.app";
    this.client = axios.create({
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.client.interceptors.request.use((config) => {
      this.token = localStorage.getItem("jwt") ? localStorage.getItem("jwt")  : "";
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
    this.client.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401 && !window.location.pathname.includes("/auth")) {
          localStorage.removeItem("jwt");
          history.push("/auth/login");
          window.location.reload()
        }
        if (err.response && err.response) {
          return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
      }
    );
  }

  get(url) {
    return this.client.get(url);
  }

  post(url, payload) {
    return this.client.post(url, payload);
  }

  put(url, payload) {
    return this.client.put(url, payload);
  }

  postFormData(url, payload) {
    
    const formDataHeaders = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.client.post(url, payload, formDataHeaders);
  }
}
