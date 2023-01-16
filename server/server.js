const express = require("express");
const app = express();

const cors = require("cors");

// const multer = require("multer");
// const upload = multer({ dest: "upload/" });
//const { uploadFile, getFileStream, deleteFile } = require("./s3");
// const fs = require("fs");
//const util = require("util");
//const unlinkFile = util.promisify(fs.unlink);
//const path = require("path");
// require("dotenv").config();

// app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
//app.use(cors({ origin: true }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to test url of application." });
});

// routes
require("./app/routes/authRoute")(app);
require("./app/routes/userRoutes")(app);
require("./app/routes/postRoutes")(app);
require("./app/routes/friendRoutes")(app);
require("./app/routes/userListRoutes")(app);
require("./app/routes/commentRoutes")(app);
require("./app/routes/postLikeRoutes")(app);

// set port, listen for requests
//Jack
//Routers
// const commentsRouter = require("./routes/Comments");
// app.use("/comments", commentsRouter);

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});
