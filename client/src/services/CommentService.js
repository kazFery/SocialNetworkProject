import authHeader from "./auth-header";
import http from "../http-common";

const getAllPostComment = (id) => {
  return http.get(`/comment/post/${id}`);
};

// const get =  (id) => {
//   return http.get(`/post/${id}`);
// };

const create = (id, data) => {
  return http.post(`/comment/${id}`, data, { headers: authHeader() });
};

// const update = (id, data) => {
//   return http.put(`/post/${id}`, data, { headers: authHeader() });
// };

// const remove = (id) => {
//   return http.delete(`/post/${id}`, { headers: authHeader() });
// };

// const getAllHomePost = (id) => {
//   return http.get(`/post/all/user/${id}`);
// };

const CommentService = {
  getAllPostComment,
  // getAllHomePost,
  // get,
  create,
  // update,
  // remove,
};

export default CommentService;
