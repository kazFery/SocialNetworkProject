const { authJwt } = require("../middleware");

module.exports = (app) => {
  const userList = require("../controllers/userListController.js");

  var router = require("express").Router();

  // Create a new Posting
  router.get("/users", userList.getAllUsers);

  // // Retrieve all Postings for a user
  router.get("/user/:id", userList.getUser);

  //   // // Retrieve all Postings for a user
  router.get("/posts/", userList.getAllPosts);

  //   Retrieve number of user
  router.get("/totalUser", userList.getTotalUser);

  app.use("/api/admin", router);
};
