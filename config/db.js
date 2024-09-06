// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Verificar que sequelize es una instancia de Sequelize
if (!(sequelize instanceof Sequelize)) {
  throw new Error('No se pudo crear una instancia válida de Sequelize');
}

module.exports = sequelize;
