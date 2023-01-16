const db = require("../models/index");
const Friend = db.friend;
const User = db.user;
const { Op } = require("sequelize");

// Create and Save a new Friendship
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const friend = {
    id: req.body.id,
    userIdSender: req.body.userIdSender,
    userIdReciver: req.body.userIdReciver,
    status: req.body.status,
    isClose: req.body.isClose,
  };

  // Save Frienship in the database
  Friend.create(friend, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Friendship.",
      });
    else res.send(data);
  });
};

/// Find a single Friendship by Id
exports.findOne = async (req, res) => {
  console.log(req.params.id);
  let friend = await Friend.findByPk(req.params.id);
  console.log("------------------");
  console.log(friend);

  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find frind for  id=${req.params.id}.`,
    });
  }
};

// Select all friend for a user
exports.getAllUserFriend = async (req, res) => {
  console.log(req.params.id);
  let friend = await Friend.findAll({
    where: { 
      userIdSender: req.params.id,
      [Op.or]: [
        {status: 'accept'}, 
        {status: 'block'}, 
        {status: 'pending'},
        {status: 'invited'}
      ]
    },
    include: {
      model: User,
      required: true,
      attributes: ['firstName', 'lastName', 'userImage']
    },
  });
  console.log(friend);
  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// Select all close friend for a user
exports.getAllUserCloseFriend = async (req, res) => {
  console.log(req.params.id);
  let friend = await Friend.findAll({
    where: { 
      isClose: true, 
      userIdSender: req.params.id,
      [Op.or]: [
        {status: 'accept'}, 
        {status: 'block'}, 
        {status: 'pending'},
        {status: 'invited'}
      ]
      },
    include: {
      model: User,
      required: true,
      attributes: ['firstName', 'lastName', 'userImage']
    },
  });
  console.log(friend);
  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// select all not friend for a user
// exports.getAllUserFriend = async (req, res) => {
//   console.log(req.params.id);
//   let friend = await Friend.findAll({
//     include: {
//       model: User,
//       required: true,
//       attributes: ['firstName', 'lastName', 'userImage']
//     },
//     where: { 
//       userIdSender: req.params.id,
//       [Op.not]: [
//         {status: 'accept'}, 
//         {status: 'block'}, 
//         {status: 'pending'},
//         {status: 'invited'}
//       ]
//     },
//   });
//   console.log(friend);
//   if (friend) {
//     res.send(friend);
//   } else {
//     res.status(404).send({
//       message: `Cannot find friend for userid  id=${id}.`,
//     });
//   }
// };

// exports.getAllUserFriend = async (req, res) => {
//   var id =req.params.id;
//   const [result, metadata] = await db.sequelize.query(
//     "SELECT f.userIdSender, f.userIdReciver, f.status, u.id as 'friendId', u.userImage, u.firstname, u.lastname FROM snpdb.Friends f JOIN snpdb.Users u ON userIdReciver = u.id WHERE status='accept' OR status='pending' AND userIdSender = " + id + ""
//     // + " union SELECT f.userIdSender, f.userIdReciver, f.status, u.id as 'friendId', u.userImage, u.firstname, u.lastname FROM snpdb.Friends f JOIN snpdb.Users u on userIdSender = u.id WHERE status='accept' AND userIdReciver = " + id + ""
//   );
//     console.log(result);
//   if (result) {
//     res.send(result);
//   } else {
//     res.status(404).send({
//       message: `Cannot find friend for userid  id=${id}.`,
//     });
//   }
// };



// select all not friend for a user
// exports.getAllUserNotFriend = async (req, res) => {
//   console.log(req.params.id);
//   let user = await User.findAll({
//     where: { 
//       id: { [Op.ne]: req.params.id},
//     },
//   });
//     console.log(user);
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send({
//       message: `Cannot find friend for userid  id=${id}.`,
//     });
//   }
// };

// Get all User not friends
exports.getAllUserNotFriend = async (req, res) => {
var id = req.params.id;
  const [result, metadata] = await db.sequelize.query(
    "SELECT * FROM snpdb.users WHERE users.id != " + id + " AND users.id NOT IN (SELECT friends.userIdReciver FROM snpdb.friends WHERE friends.userIdSender = " + id + ")"
    );
    console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// Get All the User Freinds Ids
exports.getAllUserFriendIds = async (req, res) => {
  console.log(req.params.id);
  let friend = await Friend.findAll({
    where: { userIdSender: req.params.id },
  });
  console.log(friend);
  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// Block a Friend with the Ids
exports.updateBlockFriend = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  let friend = await Friend.update(
    {
      status: 'block',
      isClose: false,
    },
    {
      where: { 
        userIdSender: req.params.id1,
        userIdReciver: req.params.id2,
      },
    }
  );
  console.log(friend);
  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot block friend for userid  id=${id1}.`,
    });
}
};

// Block a Friend with the Ids
//   const [result, metadata] = await db.sequelize.query(
//     "UPDATE friends SET status='block' WHERE userIdSender = " + id1 + " AND userIdReciver = " + id2 + " "
//   );
//     console.log(result);
//   if (result) {
//     res.send(result);
//   } else {
//     res.status(404).send({
//       message: `Cannot find friend for userid  id=${id2}.`,
//     });
//   }
// };

// UnBlock a Person with the Ids
exports.updateUnBlockFriend = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  const [result, metadata] = await db.sequelize.query(
    "UPDATE friends SET status='accept' WHERE userIdSender = " + id1 + " AND userIdReciver = " + id2 + " "
  );
    console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id2}.`,
    });
  }
};

// if (!req.body) {
//   res.status(400).send({
//     message: "Content can not be empty!",
//   });
// }
// await Friend.update(
//   {
//     userIdSender: req.body.userIdSender,
//     userIdReciver: req.body.userIdReciver,
//     status: 'blocked',
//     isClose: 0,
//   },
//   { where: { id: req.params.id } }
// )
//   .then((res) =>
//     res.status(200).send({ message: `Updated friend ${req.params.id} ` })
//   )
//   .catch((err) =>
//     res
//       .status(404)
//       .send({ message: `Cannot find post for  id=${req.params.id}.` })
//   );
// };

// Block a Person with the Ids
exports.updateBlockPerson = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  const [result, metadata] = await db.sequelize.query(
    "INSERT INTO friends (userIdSender, userIdReciver, status, isClose) VALUES (" + req.params.id1 + "," + req.params.id2 + ",'block', '0')"
  );
    console.log(result);
  if (result) { 
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

exports.updateBlockedPerson = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  const [result, metadata] = await db.sequelize.query(
    "INSERT INTO friends (userIdSender, userIdReciver, status, isClose) VALUES (" + req.params.id1 + "," + req.params.id2 + ",'blocked', '0')"
  );
    console.log(result);
  if (result) { 
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};


//   await Friend.findAll({
//     where: { 
//       // userIdSender: req.params.id 
//       [Op.not]: [
//         { userIdSender: [req.params.id] }
//       ] 
//     },
//     include: {
//       model: User,
//       required: true,
//       attributes: ['firstName', 'lastName']
//     },
//   });
//   console.log(friends);
//   if (friends) {
//     res.send(friends);
//   } else {
//     res.status(404).send({
//       message: `Cannot find friend for userid  id=${id}.`,
//     });
//   }
// };

// Delete a Friendship with the specified id in the request
exports.delete = async (req, res) => {
  }
  // console.log(req.params.id1);
  // console.log(req.params.id2);
  //   const [result, metadata] = await db.sequelize.query(
  //     "DELETE FROM Friends WHERE (userIdSender = " + req.params.id1 + "AND userIdReciver = " + req.params.id2 + ") AND " + "(userIdSender = " + req.params.id2 + "AND userIdReciver = " + req.params.id1 + ")"
  //   );
  //     console.log(result);
  //   if (result) {
  //     res.send(result);
  //   } else {
  //     res.status(404).send({
  //       message: `Cannot find friend for userid  id=${id}.`,
  //     });
  //   }
  // };

// // Delete a Friendship with the specified id in the request
// exports.deleteUnBlock  = async (req, res) => {
    // console.log(req.params.id1);
    // console.log(req.params.id2);
    //   const [result, metadata] = await db.sequelize.query(
    //     "DELETE FROM Friends WHERE (userIdSender = " + req.params.id1 + "AND userIdReciver = " + req.params.id2 + ") AND " + "(userIdSender = " + req.params.id2 + "AND userIdReciver = " + req.params.id1 + ")"
    //   );
    //     console.log(result);
    //   if (result) {
    //     res.send(result);
    //   } else {
    //     res.status(404).send({
    //       message: `Cannot find friend for userid  id=${id}.`,
    //     });
    //   }
    // };
// Delete a Friendship with the specified id in the request
  exports.deleteUnBlock  = async (req, res) => {
    console.log(req.params.id1);
    console.log(req.params.id2);
    let friend = await Friend.destroy(
      {
        where: {
        userIdSender: req.params.id1,
        userIdReciver: req.params.id2,
        }
      }
      .then (
        friend = await Friend.destroy(
          {
            where: {
            userIdSender: req.params.id2,
            userIdReciver: req.params.id1,
            }
          }
        )
      )
    );
    console.log(friend);
    if (friend) { 
      res.send(friend);
    } else {
      res.status(404).send({
        message: `Cannot find friend for userid  id=${id}.`,
      });
    }
  };

// Make Close Friend with the Ids
exports.updateCloseFriend = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  let friend = await Friend.update(
    {
      isClose: true,
    },
    {
      where: { 
        userIdSender: req.params.id1,
        userIdReciver: req.params.id2,
      },
    }
  );
  console.log(friend);
  if (friend) {
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot block friend for userid  id=${id1}.`,
    });
}
};

// UnClose a Friend with the Ids
exports.updateUnCloseFriend = async (req, res) => {
console.log(req.params.id1);
console.log(req.params.id2);
let friend = await Friend.update(
  {
    isClose: false,
  },
  {
    where: { 
      userIdSender: req.params.id1,
      userIdReciver: req.params.id2,
    },  
  }
);
console.log(friend);
if (friend) {
  res.send(friend);
} else {
  res.status(404).send({
    message: `Cannot block friend for userid  id=${id1}.`,
  });
}
};

// Invite a Person with the Ids
exports.postRequestFriend = async (req, res) => {
  console.log('=======friendController===========');
  console.log(req.params.id1);
  console.log(req.params.id2);
  let friend = await Friend.create(
    {
      userIdSender: req.params.id1,
      userIdReciver: req.params.id2,
      status: 'pending',
      isClose: false,
    }
  );
  console.log(friend);
  if (friend) { 
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// Receive Invitation with the Ids
exports.postReceiveFriend = async (req, res) => {
  console.log('=======friendController===========');
  console.log(req.params.id1);
  console.log(req.params.id2);
  let friend = await Friend.create(
    {
      userIdSender: req.params.id1,
      userIdReciver: req.params.id2,
      status: 'invited',
      isClose: false,
    }
  );
  console.log(friend);
  if (friend) { 
    res.send(friend);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};

// accept a friendship
exports.updateAcceptFriend = async (req, res) => {
    console.log(req.params.id1);
    console.log(req.params.id2);
    let friend = await Friend.update(
      {
        status: 'accept',
        isClose: false,
      },
      {
        where: { 
          userIdSender: req.params.id1,
          userIdReciver: req.params.id2,
        },
      }
    );
    console.log(friend);
    if (friend) {
      res.send(friend);
    } else {
      res.status(404).send({
        message: `Cannot block friend for userid  id=${id1}.`,
      });
  }
};

exports.updateRequestFriend = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  const [result, metadata] = await db.sequelize.query(
    "UPDATE friends SET status='accept' WHERE userIdSender = " + id2 + " AND userIdReciver = " + id1 + " "
  );
    console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id2}.`,
    });
  }
};

// Delete a Friendship with the specified id in the request
exports.deleteDeclineFriend  = async (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  let friend = await Friend.destroy(
    {
      where: {
      userIdSender: req.params.id1,
      userIdReciver: req.params.id2,
    }}.then (
      friend = await Friend.destroy(
        {
          where: {
          userIdSender: req.params.id2,
          userIdReciver: req.params.id1,
          }
        }
      )
    )
  );
  console.log(result);
  if (result) { 
    res.send(result);
  } else {
    res.status(404).send({
      message: `Cannot find friend for userid  id=${id}.`,
    });
  }
};