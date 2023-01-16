const { authJwt } = require("../middleware");

module.exports = (app) => {
  const post = require("../controllers/postController.js");

  var router = require("express").Router();

  // Create a new Posting
  router.post("/", [authJwt.verifyToken], post.create);

  // // Retrieve all Postings
  // router.get("/", post.findAll);

  // Retrieve a single Posting with id
  router.get("/:id", post.findOne);

  // Update a Posting with id
  router.put("/:id", [authJwt.verifyToken], post.update);

  // Delete a Posting with id
  router.delete("/:id", [authJwt.verifyToken], post.delete);

  app.use("/api/post", router);
};