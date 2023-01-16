import http from "../http-common";
import authHeader from "./auth-header";

const getAllUsers = () => {
  // return http.get("/admin/users", { headers: authHeader() });
  return http.get("/admin/users");
};

const getAllPosts = () => {
  return http.get("/admin/posts");
};

const getUser = (id) => {
  return http.get(`/admin/user/${id}`, { headers: authHeader() });
};

const getTotalUser = () => {
  return http.get("/admin/totalUser");
};

// const update = (id, data) => {
//   return http.put(`/admin/users/${id}`, data, { headers: authHeader() });
// };

// const remove = (id) => {
//   return http.delete(`/admin/users/${id}`, { headers: authHeader() });
// };

// const getUserInfo = (id) => {
//   return http.get(`/user/${id}`, { headers: authHeader() });
//};

const AdminService = {
  getAllUsers,
  getUser,
  getAllPosts,
  getTotalUser,
  //   update,
  //   remove,
  //   getUserInfo,
};

export default AdminService;
