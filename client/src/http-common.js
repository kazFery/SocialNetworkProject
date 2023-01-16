import axios from "axios";
export const ROOT_URL = "http://localhost:8080";

export default axios.create({
  baseURL: ROOT_URL + "/api",
  headers: {
    "Content-type": "application/json",
  },
});
