module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define("PostLikes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return PostLike;
};