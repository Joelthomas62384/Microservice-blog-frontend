"use client"
import { useAuth } from "@/context";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getCookie,removeCookie } from "typescript-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost/",
  withCredentials: true,
  timeout : 15000,
});

// const {userLoggedIn} = useAuth()
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const tokenExpiry:Number = Number(getCookie("expiry"));
      const currentTime:Number = Math.floor(Date.now() / 1000);

      if ( tokenExpiry && currentTime > tokenExpiry) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
         
            const response = await axios.post("http://localhost/api/auth/refresh", {}, { withCredentials: true });

            console.log("Token refreshed successfully", response.data);
          } catch (error) {
            console.error("Token refresh failed. Logging out user.");
            throw new Error("Logout")

           
          } finally {
            isRefreshing = false;
          }
        } else {
          console.log("Token refresh already in progress, waiting...");
        }
      }

      return config;
    } catch (error) {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
