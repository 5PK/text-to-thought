const user = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
      {
        email: {
          type: DataTypes.STRING,
          unique: true
        },
        name: {
          type: DataTypes.STRING,
          unique: false
        },
        hashedPassword: {
          type: DataTypes.STRING,
          unique: false
        },
        seed: {
          type: DataTypes.INTEGER,
          unique: false
        },
        isActive: {
          type: DataTypes.BOOLEAN
        }
      },
      { timestamps: true }
    );
  
    User.associate = models => {
      User.hasMany(
        models.Message,
        { onDelete: "CASCADE" },
        { foreignKey: "UserId" }
      );
    };
  
    return User;
  };
  
  module.exports = user;
  