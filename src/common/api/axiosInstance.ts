import axios from "axios";
import { API_BASE_URL } from "../constans/config";
import { ITokenRequest } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { getAuthTokens } from "../utils/getAuthTokens";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const tokens = getAuthTokens();
  config.headers.Authorization = `Bearer ${tokens?.token}`;
  return config;
});
let isRetry = true;
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const tokens = getAuthTokens();
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && isRetry) {
      isRetry = false;
      try {
        const response = await instance.post<ITokenRequest>(
          "User/RefreshToken",
          tokens
        );
        setAuthToken(response.data);
        return instance.request(originalRequest);
      } catch (e) {
        console.error("User not authorized");
      }
    }
  }
);
export default instance;
