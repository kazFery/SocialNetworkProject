module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comments", {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentText: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });
  return Comment;
};