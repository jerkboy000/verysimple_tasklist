// Function to fetch tasks by user with pagination
async function fetchTasksByUser(user_id, page, pageSize) {
  // Perform logic to fetch tasks based on user_id, page, and pageSize
  // You may need to use a database library like Prisma or Sequelize

  // Example: Fetch tasks from a hypothetical 'tasks' table
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const tasks = await TaskModel.findAll({
    where: { user_id },
    offset: startIndex,
    limit: pageSize,
  });

  return tasks;
}