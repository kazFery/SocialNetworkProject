import AuthService from "../services/auth.service";
 const currentUser = AuthService.getCurrentUser();


const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const { uploadFile, getFileStream, deleteFile } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const path = require('path');
require('dotenv').config();

// app.use(cors())
app.use(express.json())

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'snpdb',
});

app.post('/addPost', function(req, res) {
    var post = req.body;
    var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {

    });
    res.end('Success');
});


//================== Friends ==============

app.get("/api/friendsList", (req, res) => {
  const sqlSelect = "SELECT * FROM users"
    db.query(sqlSelect, req.userId, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.send(result);
      }
    })
  })

  // app.get("/api/availableFriends", (req, res) => {
  //   const sqlSelect = "Select u.id as 'userId', u.email, u.password, u.firstname, u.lastname, u.userImage, u.role, u.username, f.status, f.user1Id from postnote.Users u join postnote.Friends f on f.user2Id = u.id where f.user1Id = ? and status = 'PENDING' Union Select u.id as 'userId', u.email, u.password, u.firstname, u.lastname, u.userImage, u.role, u.username, f.status, f.user1Id from postnote.Users u join postnote.Friends f on f.user1Id = u.id where f.user2Id = ? and status = 'PENDING' Union Select u.id, u.email, u.password, u.firstName,u.lastName,u.userImage, u.role, u.username, null as 'status', null as 'user1Id'  From Users u where u.id != ? and u.id not in  (Select f.user2Id From Users u left join Friends f on u.id=f.user1Id where f.user1Id = ? union Select f.user1Id From Users u left join Friends f on u.id=f.user2Id where f.user2Id = ?)";
  //   db.query(sqlSelect, [id, id, id, id, id], (err, result) => {
  //     if (err) {
  //       res.status(500).send("Error while retrieving the list");
  //     } else {
  //       if (result.length > 0) {
  //         res.send(result);
  //       } else {
  //         res.status(404).send("List has a problem");
  //       }
  //     }
  //   });
  // });

  // app.get('/api/users', (req, res) => {
  //   const sqlQuery = "SELECT * FROM Users"
  //   db.query(sqlQuery, req.userId, (err, users) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send("Error trying to retrieve articles.");
  //     }
  //     else {
  //       console.log(sqlQuery);
  //       console.log(users);
  //       res.send(users);
  //     }
  //   })
  // });
  
  // app.listen(port, (err) => {
  //   if (err) return console.log(err);
  //   console.log('Server running on port: ', port)
  // });

  