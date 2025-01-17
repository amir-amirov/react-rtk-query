import axios from "axios";

export const accessToken = "accessToken";
export const refreshToken = "refreshToken";
export const authAccessTokenHeaderName = "Authorization";

const baseService = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const saveTokens = (access_token: string, refresh_token: string) => {
  localStorage.setItem("token", access_token);
  localStorage.setItem("refreshToken", refresh_token);
};

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

// interceptors
baseService.interceptors.response.use(
  (response) => {
    console.log("This is interceptor after response...");
    if (response.data && response.data[accessToken]) {
      console.log("Setting tokens to header");
      saveTokens(response.data[accessToken], response.data[refreshToken]);
      setAuthHeader(response.data[accessToken]);
    }
    console.log("Response got:", response);
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Error logout");
    }
    return Promise.reject(error);
  }
);

baseService.interceptors.request.use(
  (config) => {
    console.log("This is interceptor before request...");
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default baseService;
