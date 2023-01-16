const { authJwt } = require("../middleware");

module.exports = (app) => {
  const friend = require("../controllers/friendController.js");

  var router = require("express").Router();

  // Request a new Friendship
  router.post("/request/:id1/:id2", friend.postRequestFriend);

  // Receive a new Friendship
  router.post("/receive/:id1/:id2", friend.postReceiveFriend);

  // Accept a new Friendship
  router.put("/accept/:id1/:id2", friend.updateAcceptFriend);

  // Update a accept Friendship
  router.put("/update/:id1/:id2", friend.updateRequestFriend);

  //  Delete a Friendship with ids
  router.delete("/decline/:id1/:id2", friend.deleteDeclineFriend);

  // Retrieve all Friends for a user
  router.get("/user/:id", friend.getAllUserFriend);

   // Retrieve all No Friends for a user
  router.get("/usernot/:id", friend.getAllUserNotFriend);

  // Retrieve all Close Friends for a user
  router.get("/userclose/:id", friend.getAllUserCloseFriend);

  // Retrieve a single Friendship with id
  router.get("/:id", friend.findOne);

  // Block a Friendship with ids
  router.put("/blockfriend/:id1/:id2", friend.updateBlockFriend);

  // Make a Close Friendship with ids
  router.put("/closefriend/:id1/:id2", friend.updateCloseFriend);

  // Block a Friendship with ids
  router.put("/unclosefriend/:id1/:id2", friend.updateUnCloseFriend);

  // Block a Person with ids
  router.put("/blockperson/:id1/:id2", friend.updateBlockPerson);
 
  // Blocked Person with ids
  router.put("/blockedperson/:id1/:id2", friend.updateBlockedPerson);

  // Delete a Friendship with ids
  router.delete("/unblock/:id1/:id2", friend.deleteUnBlock);
  
  // // Retrieve all Friends
  // router.get("/", friend.findAll);

  // //  Delete a Friendship with ids
  router.delete("/:id1/:id2",  friend.delete);

  app.use("/api/friend", router);
};