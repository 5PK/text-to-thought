const message = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      message: DataTypes.STRING
    },
    {
      timestamps: true
    }
  );

  Message.associate = models => {
    Message.belongsTo(models.User, { foreignKey: "userId" });
  };



  return Message;
};

module.exports = message
