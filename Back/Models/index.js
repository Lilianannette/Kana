const { Sequelize, Op, DataTypes} = require('sequelize');
const sequelize_db = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize_db = sequelize_db;

db.user = require('./user.model')(sequelize_db, DataTypes);
db.typeofgame = require('./typeofgame.model')(sequelize_db, DataTypes);
db.game = require('./game.model')(sequelize_db, DataTypes);

module.exports = db;