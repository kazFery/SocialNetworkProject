const db = require("../models/index");
const Post = db.post;
const Friend = db.friend;
const User = db.user;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const post = {
    id: req.body.id,
    postText: req.body.postText,
    postImage: req.body.postImage,
    privacy: req.body.privacy,
    authorId: req.body.authorId,
    totalLike: req.body.totalLike,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  };

  // Save Posting in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Posting.",
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

// select all post for a user
exports.getAllUserPost = async (req, res) => {
  console.log(req.params.id);
  let post = await Post.findAll({
    where: { 
      authorId: req.params.id 
    },
    include: {
      model: User,
      required: true,
      attributes: ['firstName', 'lastName', 'userImage']
    },
  });
  console.log(post);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({
      message: `Cannot find post for userid  id=${id}.`,
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
    "SELECT p.id, p.authorId, p.postText, p.postImage, p.privacy, p.totalLike, u.firstName, u.userImage FROM posts as p left join users as u on p.authorId = u.id",
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
