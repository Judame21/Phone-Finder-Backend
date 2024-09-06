const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Por defecto, no es administrador
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true // Opcional
  }
});

module.exports = User;
