const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('NOT STARTED', 'IN PROGRESS', 'COMPLETED'),
    allowNull: false,
  },
  // Add user_id field with a specific foreign key name 'assignedUserId'
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User', // 'User' refers to the table name
      key: 'id',
    },
    // Specify the name of the foreign key
    field: 'assignedUserId',
  },
});

module.exports = Task;