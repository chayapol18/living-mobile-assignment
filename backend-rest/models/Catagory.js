module.exports = (sequelize, DataTypes) => {
  const Catagory = sequelize.define(
    "Catagory",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Catagory.associate = (models) => {
    Catagory.hasMany(models.Menu, {
      foreignKey: {
        name: "catagoryId",
      },
      OnUpdate: "RESTRICT",
      onDelete: "CASCADE",
    });

    Catagory.belongsTo(models.Store, {
      foreignKey: {
        name: "storeId",
        allowNull: false,
      },
      OnUpdate: "RESTRICT",
      onDelete: "CASCADE",
    });
  };

  return Catagory;
};