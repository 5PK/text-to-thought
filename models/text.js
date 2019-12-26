const text = (sequelize, DataTypes) => {
  const Text = sequelize.define(
    "text",
    {
      message: {
        type: DataTypes.STRING
      }
    },
    { timestamps: true }
  );

  return Text;
};

module.exports = text;
