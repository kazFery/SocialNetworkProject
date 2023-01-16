const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, DataTypes);
db.post = require("./Post.js")(sequelize, Sequelize);
db.friend = require("./Friend.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);
db.postLike = require("./PostLike.js")(sequelize, Sequelize);

db.user.hasMany(db.post, { foreignKey: "authorId" });
db.post.belongsTo(db.user, { foreignKey: "authorId" });

db.user.hasMany(db.comment, { foreignKey: "authorId" });
db.comment.belongsTo(db.user, { foreignKey: "authorId" });

db.post.hasMany(db.comment, { foreignKey: "postId" });
db.comment.belongsTo(db.post, { foreignKey: "postId" });

db.user.hasMany(db.friend, { foreignKey: "userIdSender" });
db.friend.belongsTo(db.user, { foreignKey: "userIdSender" });

db.user.hasMany(db.friend, { foreignKey: "userIdReciver" });
db.friend.belongsTo(db.user, { foreignKey: "userIdReciver" });

db.user.hasMany(db.postLike, { foreignKey: "userId" });
db.postLike.belongsTo(db.user, { foreignKey: "userId" });

db.post.hasMany(db.postLike, { foreignKey: "postId" });
db.postLike.belongsTo(db.post, { foreignKey: "postId" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync is done!");
});

module.exports = db;