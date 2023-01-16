const db = require("../models/index");
const PostLike = db.postLike;
const Post = db.post;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const postlike = {
    id: req.body.id,
    userId: req.body.userId,
    postId: req.body.postId,
    status: req.body.status,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  };
  console.log(req.body.postId);
  let postl = await PostLike.findOne({
    where: {
      userId: req.body.userId,
      postId: req.body.postId,
      status: req.body.status,
    },
  });
  if (!postl) {
    Post.update(
      {
        totalLike: db.sequelize.literal("totalLike + 1"),
        updatedAt: new Date(),
      },
      { where: { id: req.body.postId } }
    )
      .then((res) =>
        res.status(200).send({ message: `Updated post ${req.params.id} ` })
      )
      .catch((err) =>
        res
          .status(404)
          .send({ message: `Cannot find post for  id=${req.params.id}.` })
      );
    PostLike.create(postlike, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post like.",
        });
      else res.send(data);
    });
  } else res.status(500);
};
