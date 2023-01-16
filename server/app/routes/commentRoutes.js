const { authJwt } = require("../middleware");

module.exports = (app) => {
  const comment = require("../controllers/commentController.js");

  var router = require("express").Router();

  // Create a new Comment
  router.post("/:id", [authJwt.verifyToken], comment.create);

  // Retrieve all Comments for a Post
  router.get("/post/:id", comment.getAllPostComment);

  // // Retrieve all Postings for a user
  // router.get("/user/:id", post.getAllUserPost);

  // // // Retrieve all Postings for a user
  // router.get("/all/user/:id", post.getAllPublishedPost);

  // // Retrieve a single Post with id
  // router.get("/:id", post.findOne);

  // //Update a Post with id
  // router.put("/:id", [authJwt.verifyToken], post.updatePost);

  // //  Delete a Posting with id
  // router.delete("/:id", [authJwt.verifyToken], post.delete);

  app.use("/api/comment", router);
};
