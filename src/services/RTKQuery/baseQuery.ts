import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import baseService from "../axios/baseService";

const refreshToken = async () => {
  try {
    const response = await baseService.post("/refresh");
    const newToken = response.data.accessToken;

    localStorage.setItem("token", newToken);

    return newToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};

// Define baseQuery function for RTK Query
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      let token = localStorage.getItem("token");

      const result = await baseService({
        url,
        method,
        data,
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      //   If unauthorized (401), attempt to refresh token
      if (err.response?.status === 401) {
        console.warn("Access token expired. Attempting to refresh...");
        const newToken = await refreshToken();

        if (newToken) {
          try {
            // Retry original request with the new token
            const retryResult = await baseService({
              url,
              method,
              data,
              params,
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return { data: retryResult.data };
          } catch (retryError) {
            return { error: retryError };
          }
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
