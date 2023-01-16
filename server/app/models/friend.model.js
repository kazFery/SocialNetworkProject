const sql = require("./db.js");

// constructor
const Friend = function (friend) {
    this.userIdSender = friend.userIdSender;
    this.userIdReceiver = friend.userIdReceiver;
    this.status = friend.status;
    this.isClose = friend.isClose;
  };

  
// Friend.create = (newFriend, result) => {
//   sql.query("INSERT INTO friend SET ?", newFriend, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created posting: ", { id: res.insertId, ...newPost });
//     result(null, { id: res.insertId, ...newPost });
//   });
// };

Friend.findById = (id, result) => {
  sql.query(`SELECT * FROM friends WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found friendship: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Friendship with the id
    result({ kind: "not_found" }, null);
  });
};

// Friend.findAll = (userId, result) => {
//   let query = "SELECT * FROM friends";

//   // if (title) {
//   //   query += ` WHERE userId LIKE '%${userId}%'`;
//   // }

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


Friend.remove = (id, result) => {
  sql.query("DELETE FROM friends WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Friendship with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted friendship with id: ", id);
    result(null, res);
  });
};

module.exports = Friend;

