const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  let role = "user";
  //   if (req.body.admin == true) {
  //     role = "admin";
  //   }
  // Save User to Database
  console.log(req.body.email);
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
  })
    .then((user) => {
      res.send({ message: "User registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    var authorities = [];

    authorities.push("ROLE_" + user.role.toUpperCase());

    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities,
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      userImage: user.userImage,
    });
  });
};
