const db = require("../models");
const Post = db.post;

exports.getAllposts = async (req, res) => {
  var posts = await Post.findAll({});
  if (posts) {
    res.send(posts);
  } else {
    res.status(404).send({
      message: "There is no post to show",
    });
  }
};

exports.getPostById = async (id) => {
  return await Post.findOne({
    // attributes: ["id", "email", "fullname", "resumeDate"],
    where: { id: id },
  });
};

exports.updatePostById = async (id, filename) => {
  // const filename = req.body.filename;
  // const id = req.params.id;
  let post = await Post.findOne({ where: { id: id } });
  if (post) {
    await Post.update(
      { postImage: filename, updatedAt: new Date() },
      { where: { id: id } }
    );
    //   res.status(200).send("updated");
    // } else {
    //   res.status(404).send("Error");
  }
};

// exports.updateProfileById = async (id, email, fullname) => {
//   let user = await User.findOne({ where: { id: id } });
//   if (user) {
//     await User.update(
//       { email: email, fullName: fullname },
//       { where: { id: id } }
//     );
//     console.log(`Updated user ${id} with ${fullname} ${email}`);
//   } else {
//     console.log(`Did not find user ${id}`);
//   }
// };
