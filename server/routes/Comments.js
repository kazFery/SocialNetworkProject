const express = require('express');
const db = require('../app/models');
const router = express.Router();
const {Comments} = require("../app/models");
const { authJwt } = require("../app/middleware");

//Get all comments/users for post with id=postId
router.get('/api/post/:postId', (req, res) => {
    const postId = req.params.postId;
    const sqlComments = "SELECT c.id, c.authorId, c.postId, c.commentText, c.createdAt, u.firstName, u.lastName, u.userImage FROM comments c JOIN users u ON c.authorId = u.id WHERE c.postId =? ORDER BY createdAt DESC"
    db.query(sqlComments, postId, (err, result) => {
        if(err) {
            res.sendStatus(500).send("Server error...");
        }
        else{
            res.send(result);
        }
    })
});

//Create a comment for a post with id=id
router.post("/:id", [authJwt.verifyToken], (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const sqlAddComment = "INSERT INTO comments (authorId, postId, commentText) VALUES (?,?,?)";
    db.query(sqlAddComment, [req.userId, id, comment], (err, result) => {
        if(err){
            res.sendStatus(500).send("Server error... Your comment went down the drain!");
        }
        else{
            res.sendStatus(201);
        }
    })
});

//DELETE comment with id=id
router.delete("/api/deletecomment/:id", [authJwt.verifyToken], (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM comments WHERE id=?";
    db.query(sqlDelete, [id], (err, result) => {
        if(err){
            res.sendStatus(500).send("Server error");
        }
        else{
            res.send("Comment deleted");
        }
    })
});

module.exports = router;