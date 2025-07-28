const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const Todo = sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relationships
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;
