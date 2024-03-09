import axios from "axios";

const baseConfig = {
  baseURL: "http://localhost:8080",
};

export default {
  service: () => {
    const instance = axios.create(baseConfig);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    return instance;
  },
};