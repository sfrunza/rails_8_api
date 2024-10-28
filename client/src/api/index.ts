// import { RootState, store } from '@/store';
import axios from 'axios';
// import store, { RootState } from '@/store';

const API_URL = '/api/v1';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = (store.getState() as RootState).auth.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

function createAxiosResponse() {
  if (localStorage.getItem("token")) {
    return axios.create({
      baseURL: "/api/v1",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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


