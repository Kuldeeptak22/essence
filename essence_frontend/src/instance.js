import axios from "axios";
import { BaseURL } from "./utils/nameSpace";

const axiosInstance = axios.create({
  baseURL: BaseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("UserToken").replace(/"/g, "");
    const token = localStorage.getItem("UserToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.replace(/"/g, "")}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
 (error)=> {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response)=> {
    return response;
  },
 (error)=> {
  if(error.response.status === 401){
    localStorage.removeItem("UserToken"); 
  }
    return Promise.reject(error);
  }
);

export default axiosInstance;
