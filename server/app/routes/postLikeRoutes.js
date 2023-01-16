const { authJwt } = require("../middleware");

module.exports = (app) => {
  const postLike = require("../controllers/PostLikeController.js");

  var router = require("express").Router();

  // Create a new Posting
  router.post("/", [authJwt.verifyToken], postLike.create);

  app.use("/api/postlike", router);
};
