import secret from "../secret.json";

export const env = {
  YANDEX_API_KEY: secret.yandexApiKey,
  API_URL: "http://localhost:8000/api",
  PHORO_URL: "http://localhost:8000/storage",
};
