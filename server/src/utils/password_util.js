const bcrypt = require("bcrypt");
const saltRounds = 10;
const logger = require("../config/logger");

// Function to hash (encrypt) a password
const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    logger.info(`Password hashed successfully`);
    return hashedPassword;
  } catch (error) {
    logger.error(`Error hashing password: ${error.message}`);
    throw error;
  }
};

// Function to verify (decrypt) a password
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    logger.info(`Password verified successfully`);
    return isMatch;
  } catch (error) {
    logger.error(`Error verifying password: ${error.message}`);
    throw error;
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
