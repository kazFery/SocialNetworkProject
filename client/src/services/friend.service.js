import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const getPublicContent = () => {
  return axios.get(API_URL + "/test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "/test/user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "/test/admin", { headers: authHeader() });
};

const getUserInfoById = async (id) => {
  try {
    const resp = await axios.get(API_URL + `/users/${id}`);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUserInfoById,
};

export default UserService;
