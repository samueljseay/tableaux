var Sequelize = require('sequelize'),
    config = require('../config/db')['development'],
    sqlize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sqlize;
