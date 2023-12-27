const User = require("../models/User");
const Task = require("../models/Task");
const { hashPassword, verifyPassword } = require("../utils/password_util");
const { generateToken }  = require("../utils/token_util"); 

const logger = require("./logger");

const setTokenCookie = (res, token, logger, mutationName) => {
    if (res.cookie && typeof res.cookie === "function") {
        // Set HttpOnly secure cookie in the response
        res.cookie("token", token, { httpOnly: true, secure: true });
    } else {
        // Handle the case where res.cookie is not a function
        logger.error(`${mutationName}: res.cookie is not a function`);
    }
};

const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            try {
                const user = await User.findByPk(id);
                logger.info(`Retrieved user by ID: ${id}`);
                return user;
            } catch (error) {
                logger.error(`Error retrieving user by ID ${id}: ${error.message}`);
                throw error;
            }
        },
        getTask: async (_, { id }) => {
            try {
                const task = await Task.findByPk(id);
                logger.info(`Retrieved task by ID: ${id}`);
                return task;
            } catch (error) {
                logger.error(`Error retrieving task by ID ${id}: ${error.message}`);
                throw error;
            }
        },
        getAllTasks: async () => {
            try {
                const tasks = await Task.findAll();
                logger.info('Retrieved all tasks');
                return tasks;
            } catch (error) {
                logger.error(`Error retrieving all tasks: ${error.message}`);
                throw error;
            }
        },
        getTasksByUser: async (_, { user_id }) => {
            try {
                const tasks = await Task.findAll({ where: { user_id } });
                logger.info(`Retrieved tasks by user ID: ${user_id}`);
                return tasks;
            } catch (error) {
                logger.error(`Error retrieving tasks by user ID ${user_id}: ${error.message}`);
                throw error;
            }
        },
    },
    Mutation: {
        signupUser: async (_, { name, email, password, confirmPassword }, { user, res }) => {
            try {
                const existingUser = await User.findOne({ where: { email } });

                if (existingUser) {
                    throw new Error('Email already exists. Please choose a different email.');
                }

                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match. Please confirm your password.');
                }

                const hashedPassword = await hashPassword(password);
                const newUser = await User.create({ name, email, password: hashedPassword });

                const token = generateToken(newUser);

                logger.info(`User signed up successfully: ${newUser.email}`);

                setTokenCookie(res, token, logger, "signupUser");

                return { 
                    user: newUser, 
                    token 
                };
            } catch (error) {
                logger.error(`Error signing up user: ${error.message}`);
                throw error;
            }
        },
        loginUser: async (_, { email, password }, { user, res }) => {
            try {
                const existingUser = await User.findOne({ where: { email } });

                if (!existingUser) {
                    throw new Error('User not found');
                }

                const isPasswordMatch = await verifyPassword(password, existingUser.password);

                if (!isPasswordMatch) {
                    throw new Error('Incorrect password');
                }

                const token = generateToken(existingUser);

                logger.info(`User logged in successfully: ${existingUser.email}`);

                setTokenCookie(res, token, logger, "loginUser");

                return { 
                    user: existingUser, 
                    token 
                };
            } catch (error) {
                logger.error(`Error logging in user: ${error.message}`);
                throw new Error('Error logging in user');
            }
        },
        createTask: async (_, { user_id, name, description, note, due_date, status }) => {
            try {
                const newTask = await Task.create({ user_id, name, description, note, due_date, status });
                logger.info(`Task created successfully: ${newTask.name}`);
                return newTask;
            } catch (error) {
                logger.error(`Error creating task: ${error.message}`);
                throw error;
            }
        },
        updateTask: async (_, { id, name, description, note, due_date, status }) => {
            try {
                await Task.update({ name, description, note, due_date, status }, { where: { id } });
                const updatedTask = await Task.findByPk(id);
                logger.info(`Task updated successfully: ${updatedTask.name}`);
                return updatedTask;
            } catch (error) {
                logger.error(`Error updating task: ${error.message}`);
                throw error;
            }
        },
        deleteTask: async (_, { id }) => {
            try {
                await Task.destroy({ where: { id } });
                logger.info(`Task deleted successfully: ID ${id}`);
                return id;
            } catch (error) {
                logger.error(`Error deleting task: ${error.message}`);
                throw error;
            }
        },
  },
  
};


module.exports = resolvers;
