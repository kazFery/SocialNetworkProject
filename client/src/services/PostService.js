import authHeader from "./auth-header";
import http from "../http-common";

const getAllUserPost = (id) => {
  return http.get(`/post/user/${id}`);
};

const get = (id) => {
  return http.get(`/post/${id}`);
};

const create = (data) => {
  return http.post("/post", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/post/${id}`, data, { headers: authHeader() });
};

const addLike = (data) => {
  return http.post(`/postlike`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/post/${id}`, { headers: authHeader() });
};

const getAllHomePost = (id) => {
  return http.get(`/post/all/user/${id}`);
};

const PostService = {
  getAllUserPost,
  getAllHomePost,
  get,
  create,
  update,
  remove,
  addLike,
};

export default PostService;
