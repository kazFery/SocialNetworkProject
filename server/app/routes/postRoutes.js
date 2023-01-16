const { authJwt } = require("../middleware");

module.exports = (app) => {
  const post = require("../controllers/postController.js");

  var router = require("express").Router();

  // Create a new Posting
  router.post("/", [authJwt.verifyToken], post.create);

  // // Retrieve all Postings for a user
  router.get("/user/:id", post.getAllUserPost);

  // // Retrieve all Postings for a user
  router.get("/all/user/:id", post.getAllPublishedPost);

  // Retrieve a single Post with id
  router.get("/:id", post.findOne);

  //Update a Post with id
  router.put("/:id", [authJwt.verifyToken], post.updatePost);

  //  Delete a Posting with id
  router.delete("/:id", [authJwt.verifyToken], post.delete);

  app.use("/api/post", router);
};
