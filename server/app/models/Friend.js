module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friends",
    {
      userIdSender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userIdReciver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "accept", "block", "invited", "blocked"),
        defaultValue: "pending",
        allowNull: false,
      },
      isClose: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Friend;
};