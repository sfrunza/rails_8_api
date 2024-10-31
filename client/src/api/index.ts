import axios from 'axios';

const API_URL = '/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function createAxiosResponse() {
  const token = localStorage.getItem("token");
  if (token) {
    return axios.create({
      baseURL: "/api/v1",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const fetcher = (url: string) =>
  createAxiosResponse()!
    .get(url)
    .then(async (res) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.data;
    });


