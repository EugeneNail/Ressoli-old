import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    post: {
      Accept: "aplication/json",
    },
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("access_token");
  return config;
});

api.interceptors.response.use(
  (response) => response,
  //TODO добавить редирект на отдельную страницу при ошибке 500
  (error) => error.response
);

export default api;
