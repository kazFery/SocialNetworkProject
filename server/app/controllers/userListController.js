const db = require("../models/index");
const User = db.user;
const Post = db.post;

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    where: { role: "user" },
    attributes: ["id", "firstName", "lastName", "email", "role"],
  });
  console.log("------------------------");
  if (users) {
    res.send(users);
  } else {
    res.status(404).send({
      message: `Cannot find user for  id=${req.params.id}.`,
    });
  }
};

exports.getUser = async (req, res) => {
  console.log(req.params.id);
  let user = await User.findByPk(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: `Cannot find user for  id=${req.params.id}.`,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  const [results, metadata] = await db.sequelize.query(
    "SELECT p.id, p.authorId, p.postText, p.postImage, p.updatedAt, p.totalLike, u.firstName, u.lastName,u.userImage  FROM posts as p left join users as u on p.authorId = u.id order by p.updatedAt"
  );

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(404).send({
      message: `Cannot find post.`,
    });
  }
};

exports.getTotalUser = async (req, res) => {
  const count = await User.count({ where: { role: "user" } });
  console.log(count);
  if (count) {
    res.status(200).send({ count: count });
  } else {
    res.status(404).send({
      message: `Cannot find user for  `,
    });
  }
};
