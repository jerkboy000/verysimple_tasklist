const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const sinon = require("sinon");
const Task = require("../models/Task");
const resolvers = require("../src/resolvers");
const logger = require("../src/logger");

describe("Task Resolver Tests", () => {
  it("should get task by ID", async () => {
    try {
      const task = {
        id: 1,
        user_id: 1,
        name: "Task 1",
        description: "Description",
        note: "Note",
        due_date: "2023-12-31",
        status: "NOT STARTED",
      };
      sinon.stub(Task, "findByPk").resolves(task);

      const result = await resolvers.Query.getTask(null, { id: 1 });

      expect(result).to.deep.equal(task);
      sinon.restore();
      logger.info("getTask by ID test passed successfully");
    } catch (error) {
      logger.error(`Error in getTask by ID test: ${error.message}`);
      throw error;
    }
  });

  it("should create task", async () => {
    try {
      const newTask = {
        id: 2,
        user_id: 1,
        name: "New Task",
        description: "Description",
        note: "Note",
        due_date: "2024-01-15",
        status: "NOT STARTED",
      };
      sinon.stub(Task, "create").resolves(newTask);

      const result = await resolvers.Mutation.createTask(null, {
        user_id: 1,
        name: "New Task",
        description: "Description",
        note: "Note",
        due_date: "2024-01-15",
        status: "NOT STARTED",
      });

      expect(result).to.deep.equal(newTask);
      sinon.restore();
      logger.info("createTask test passed successfully");
    } catch (error) {
      logger.error(`Error in createTask test: ${error.message}`);
      throw error;
    }
  });

  it("should update task", async () => {
    try {
      const updatedTask = {
        id: 3,
        user_id: 1,
        name: "Updated Task",
        description: "Updated Description",
        note: "Updated Note",
        due_date: "2024-02-01",
        status: "IN PROGRESS",
      };
      sinon.stub(Task, "update").resolves(1);
      sinon.stub(Task, "findByPk").resolves(updatedTask);

      const result = await resolvers.Mutation.updateTask(null, {
        id: 3,
        name: "Updated Task",
        description: "Updated Description",
        note: "Updated Note",
        due_date: "2024-02-01",
        status: "IN PROGRESS",
      });

      expect(result).to.deep.equal(updatedTask);
      sinon.restore();
      logger.info("updateTask test passed successfully");
    } catch (error) {
      logger.error(`Error in updateTask test: ${error.message}`);
      throw error;
    }
  });

  it("should delete task", async () => {
    try {
      sinon.stub(Task, "destroy").resolves(1);

      const result = await resolvers.Mutation.deleteTask(null, { id: 1 });

      expect(result).to.equal(1);
      sinon.restore();
      logger.info("deleteTask test passed successfully");
    } catch (error) {
      logger.error(`Error in deleteTask test: ${error.message}`);
      throw error;
    }
  });
});
