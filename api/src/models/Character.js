const { DataTypes,UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    species:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    origin:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    created:{
      type: DataTypes.STRING,
      allowNull:false
    },
    CreatedInDb:{
      type: DataTypes.BOOLEAN,
      defaulValue: true,
    }

  });
};
