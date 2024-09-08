const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que ya tienes una configuración de base de datos

const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    text: {
        type: DataTypes.TEXT,
        allowNull: false         
    }
  });

module.exports = Product;