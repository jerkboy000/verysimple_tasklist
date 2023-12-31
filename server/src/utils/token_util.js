require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../logger");

// Function that generates token
const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "1h" },
    );
    logger.info(`Token generated successfully for user: ${user.email}`);
    return token;
  } catch (error) {
    logger.error(`Error generating token: ${error.message}`);
    throw error;
  }
};

// Function that verifies token
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    logger.info(`Token verified successfully`);
    return decodedToken;
  } catch (error) {
    logger.error(`Error verifying token: ${error.message}`);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
