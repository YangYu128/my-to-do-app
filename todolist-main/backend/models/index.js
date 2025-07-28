const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todolist', 'postgres', 'Admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = { sequelize };