const { authJwt } = require("../middleware");
//const sanitize = require("sanitize-filename");
const controller = require("../controllers/userController");

const { uploadFileToS3, getFileStreamFromS3 } = require("../../s3");
const multer = require("multer");
const upload = multer({ dest: "images/" });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //S3 upload file
  // app.post("/api/post/:id", upload.single("file"), async (req, res) => {
  //   const id = req.params.id;
  //   const file = req.file;
  //   const result = await uploadFileToS3(file);
  //   if (!result) {
  //     res.status(406).send({ message: "File extention not supported!" });
  //   } else {
  //     console.log(result.key + "    " + id);
  //     userPostController.updatePostById(id, result.key);
  //     res.status(200).send({ message: "Your image uploaded successfully!" });
  //   }
  // });

  app.post("/api/post/image", upload.single("file"), async (req, res) => {
    const file = req.file;
    const result = await uploadFileToS3(file);
    if (!result) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result.key);
      //userPostController.updatePostById(id, result.key);
      res.status(200).send({ key: result.key });
    }
  });

  app.get("/api/user/:id", controller.getUserInfoById);
  app.put("/api/user/:id", [authJwt.verifyToken], controller.updateUser);
};
