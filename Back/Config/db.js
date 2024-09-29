const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


const sequelize_db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize_db.authenticate()
  .then(() => {
    console.log('Connexion établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

module.exports = sequelize_db;