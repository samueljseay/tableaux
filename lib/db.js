var Sequelize = require('sequelize'),
    env = process.env.NODE_ENV,
    config = require('../config/db')[env];

var sqlize;

// TODO generate a connection uri for all environments
if(env === 'development') {
  sqlize = new Sequelize(config.database, config.username, config.password, config);
} else {
  sqlize = new Sequelize(process.env.DATABASE_URL);
}

module.exports = sqlize;

// load models
require('require-dir')('../models');