const sql = require("./db.js");

// constructor
const Post = function (post) {
  this.postText = post.postText;
  this.postImage = post.postImage;
  this.status = post.status;
  this.authorId = post.authorId;
  this.totalLike = post.totalLike;
  this.createdAt = post.createdAt;
  this.updatedAt = post.updatedAt;
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posting: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Post.findById = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Posting with the id
    result({ kind: "not_found" }, null);
  });
};

// Post.getAll = (title, result) => {
//   let query = "SELECT * FROM posts";

//   if (title) {
//     query += ` WHERE job_title LIKE '%${title}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("posts: ", res);
//     result(null, res);
//   });
// };

// Post.getAllisDone = (result) => {
//   sql.query("SELECT * FROM posts WHERE isDone=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("postings: ", res);
//     result(null, res);
//   });
// };

// Post.updateById = (id, posting, result) => {
//   sql.query(
//     "UPDATE posts SET job_title = ?, job_description = ?, job_location = ?, job_type = ?, job_salary = ? WHERE id = ?",
//     [
//       posting.job_title,
//       posting.job_description,
//       posting.job_location,
//       posting.job_type,
//       posting.job_salary,
//       id,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Posting with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated posting: ", { id: id, ...posting });
//       result(null, { id: id, ...posting });
//     }
//   );
// };

// Post.remove = (id, result) => {
//   sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Posting with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted posting with id: ", id);
//     result(null, res);
//   });
// };

module.exports = Post;
