import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/admin/users", { headers: authHeader() });
};

const get = (id) => {
  return http.get(`/admin/user/${id}`, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/user/${id}`, { headers: authHeader() });
};

const getUserInfo = (id) => {
  return http.get(`/user/${id}`, { headers: authHeader() });
};

const UserService = {
  getAll,
  get,
  update,
  remove,
  getUserInfo,
};

export default UserService;
