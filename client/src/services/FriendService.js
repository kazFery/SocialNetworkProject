import authHeader from "./auth-header";
import http from "../http-common";


  // Request a new Friendship
    const postRequestFriend = (id1, id2) => {
    return http.post(`/friend/request/${id1}/${id2}`);
  };

    // Request a new Friendship
    const postReceiveFriend = (id1, id2) => {
      return http.post(`/friend/receive/${id1}/${id2}`);
    };
  // Accept a new Friendship
  const updateAcceptFriend = (id1, id2) => {
    return http.put(`/friend/accept/${id1}/${id2}`);
  };

    // Request a new Friendship
    const updateRequestFriend = (id1, id2) => {
      return http.put(`/friend/request/${id1}/${id2}`);
    };

  //  Delete a Friendship with ids
  const deleteDeclineFriend = (id1, id2) => {
  return http.delete(`/friend/decline/${id1}/${id2}`);
};

const getAllUserFriend = (id) => {
  return http.get(`/friend/user/${id}`);
};

const getAllUserCloseFriend = (id) => {
  return http.get(`/friend/userclose/${id}`);
};

const getAllUserNotFriend = (id) => {
  return http.get(`/friend/usernot/${id}`);
};

const get =  (id) => {
  return http.get(`/friend/${id}`);
};

// const create = (data) => {
//   return http.post("/post", data, { headers: authHeader() });
// };

const updateBlockFriend = (id1, id2) => {
  return http.put(`/friend/blockfriend/${id1}/${id2}`);
};

const updateUnCloseFriend = (id1, id2) => {
  return http.put(`/friend/unclosefriend/${id1}/${id2}`);
};

const updateCloseFriend = (id1, id2) => {
  return http.put(`/friend/closefriend/${id1}/${id2}`);
};

const updateUnBlockFriend = (id1, id2) => {
  return http.put(`/friend/unblockfriend/${id1}/${id2}`);
};

const updateBlockPerson = (id1, id2) => {
  return http.put(`/friend/blockperson/${id1}/${id2}`);
};

const updateBlockedPerson = (id1, id2) => {
  return http.put(`/friend/blockedperson/${id1}/${id2}`);
};

const deleteUnBlock = (id1, id2) => {
  return http.delete(`/friend/unblock/${id1}/${id2}`);
};

const remove = (id1, id2) => {
  return http.delete(`/friend/${id1}/${id2}`);
};

const FriendService = {
  getAllUserFriend,
  getAllUserCloseFriend,
  getAllUserNotFriend,
  get,
  // create,
  updateBlockFriend,
  updateUnBlockFriend,
  updateBlockPerson,
  updateBlockedPerson,
  updateCloseFriend,
  updateUnCloseFriend,

  deleteUnBlock,
  remove,

  postRequestFriend,
  postReceiveFriend,
  updateAcceptFriend,
  updateRequestFriend,
  deleteDeclineFriend,

};

export default FriendService;
