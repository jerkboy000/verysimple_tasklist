// Models
const User = require("../src/models/User");
const Task = require("../src/models/Task");

// Define associations with the specified foreign key name
User.hasMany(Task, { foreignKey: "assignedUserId" });
Task.belongsTo(User, { foreignKey: "assignedUserId" });