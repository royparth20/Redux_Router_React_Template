import axios from "axios";
import isLocalStorageAvailable from "../utils/isLocalStorageAvailable";

const baseURL = "http://localhost:8001/api/v1";
export { baseURL };

const client = axios.create({
  baseURL,
});

client.interceptors.response.use(undefined, (error) => {
  if (
    error.response?.status === 404 &&
    error.response?.data?.message ===
      "You are logged out because you logged in with some other device. Please login again."
  ) {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }

  error.message = error.response
    ? error.response.data.message
    : error.request
    ? error.message
    : "Something went wrong. Try again.";
  return Promise.reject(error);
});

export default client;
