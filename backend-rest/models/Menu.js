module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
    );
  
    Menu.associate = (models) => {
      Menu.belongsTo(models.Catagory, {
        foreignKey: {
          name: "catagoryId",
          allowNull: false,
        },
        OnUpdate: "RESTRICT",
        onDelete: "CASCADE",
      });
    }

  return Menu;
};