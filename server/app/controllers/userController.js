const db = require("../models/index");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getUserInfoById = async (req, res) => {
  console.log(req.params.id);
  let user = await User.findByPk(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: `Cannot finduser for  id=${req.params.id}.`,
    });
  }
};

exports.updateUser = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  await User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userImage: req.body.userImage,
      updatedAt: new Date(),
    },
    { where: { id: req.params.id } }
  )
    .then((res) =>
      res.status(200).send({ message: `Updated user ${req.params.id} ` })
    )
    .catch((err) =>
      res
        .status(404)
        .send({ message: `Cannot find user for  id=${req.params.id}.` })
    );
};
