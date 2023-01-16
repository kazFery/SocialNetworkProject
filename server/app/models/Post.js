module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Posts", {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    postImage: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    privacy: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    totalLike: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Post;
};
