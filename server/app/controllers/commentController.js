const { where } = require("sequelize");
const db = require("../models/index");
const Post = db.post;
const Friend = db.friend;
const Comment = db.comment;

// Create and Save a new Comment
exports.create = (req, res) => {
  //console.log(req.params.id);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  

  const comment = {
    id: req.body.id,
    postId: req.body.postId,
    commentText: req.body.commentText,
    // postImage: req.body.postImage,
    // privacy: req.body.privacy,
    authorId: req.body.authorId,
    // totalLike: req.body.totalLike,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  };

  // Save Comment in the database
  Comment.create(comment, 
    //{where:{id: req.params.id}},
    (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    else res.send(data);
  });
};

// update  a post by Id
exports.updatePost = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  await Post.update(
    {
      postText: req.body.postText,
      postImage: req.body.postImage,
      privacy: req.body.privacy,
      updatedAt: new Date(),
    },
    { where: { id: req.params.id } }
  )
    .then((res) =>
      res.status(200).send({ message: `Updated post ${req.params.id} ` })
    )
    .catch((err) =>
      res
        .status(404)
        .send({ message: `Cannot find post for  id=${req.params.id}.` })
    );
};

// Find a single Post by Id
exports.findOne = async (req, res) => {
  console.log(req.params.id);
  let post = await Post.findByPk(req.params.id);

  if (post) {
    res.send(post);
  } else {
    res.status(404).send({
      message: `Cannot find post for  id=${req.params.id}.`,
    });
  }
};

// select all comments for a post
exports.getAllPostComment = async (req, res) => {
  console.log(req.params.id);
  let comment = await Comment.findAll({
    where: { postId: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ['firstName', 'lastName', 'userImage']
    },
  });
  console.log(comment);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send({
      message: `Cannot find comment for postId  id=${id}.`,
    });
  }
};

// select all public post and all friend post to show in home page

exports.getAllPublishedPost = async (req, res) => {
  console.log(req.params.id);
  // let friends = await db.sequelize.query(
  //   "SELECT userIdReciver FROM friends where userIdSender = :s",
  //   {
  //     replacements: { s: req.params.id },
  //     type: db.sequelize.QueryTypes.SELECT,
  //   }
  // );
  const [results, metadata] = await db.sequelize.query(
    "SELECT * FROM posts where privacy = 'F' or privacy = 'CF' and  authorId in (SELECT userIdReciver FROM friends where userIdSender = :s) order by updatedAt",
    {
      replacements: { s: req.params.id },
    }
  );

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(404).send({
      message: `Cannot find post for userid  id=${id}.`,
    });
  }
};

// Delete a Posting with the specified id in the request
exports.delete = async (req, res) => {
  let post = await Post.findByPk(req.params.id);
  console.log("------------------");
  console.log(post);
  if (post) {
    Post.destroy({ where: { id: req.params.id } }).then((count) => {
      if (!count) {
        return res.status(404).send({ error: "No user" });
      }
      res.status(204).send({ message: `Post was deleted successfully!` });
    });
  } else {
    res
      .status(404)
      .send({ message: `Not found Post with id ${req.params.id}.` });
  }
};
