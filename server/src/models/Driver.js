const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  let Driver = sequelize.define('Driver', {
    driver_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_de_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Driver;
};