const describe = require("mocha").describe;
const it = require("mocha").it;
const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/password_util");
const { generateToken, verifyToken } = require("../utils/token_util");
const resolvers = require("../src/resolvers");
const logger = require("../src/logger");

describe('User Resolver Tests', () => {
  it('should get user by ID', async () => {
    try {
      const user = { id: 1, name: 'John', email: 'john@example.com', password: 'hashedPassword' };
      sinon.stub(User, 'findByPk').resolves(user);

      const result = await resolvers.Query.getUser(null, { id: 1 });

      expect(result).to.deep.equal(user);
      sinon.restore();
      logger.info('getUser test passed successfully');
    } catch (error) {
      logger.error(`Error in getUser test: ${error.message}`);
      throw error;
    }
  });

  it('should signup user', async () => {
    try {
      const newUser = { id: 2, name: 'Alice', email: 'alice@example.com', password: 'hashedPassword' };

      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(newUser);
      sinon.stub(require("../utils/password_util"), 'hashPassword').resolves('hashedPassword');
      sinon.stub(require("../utils/token_util"), 'generateToken').callsFake(user => generateToken(user)); 

      // Mock the context with the decoded user
      const context = { user: null, res: { cookie: sinon.stub() } };

      const result = await resolvers.Mutation.signupUser(null, {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      }, context);

      expect(result.user).to.deep.equal(newUser);
      expect(verifyToken(result.token)).to.not.be.null;
      sinon.restore();
      logger.info('signupUser test passed successfully');
    } catch (error) {
      logger.error(`Error in signupUser test: ${error.message}`);
      throw error;
    }
  });

  it('should login user', async () => {
    try {
      const plainPassword = 'password123';
      const hashedPassword = await hashPassword(plainPassword);
      const user = { id: 3, name: 'Bob', email: 'bob@example.com', password: hashedPassword };

      sinon.stub(User, 'findOne').resolves(user);

      sinon.stub(require("../utils/password_util"), 'verifyPassword').resolves(true);
      sinon.stub(require("../utils/token_util"), 'generateToken').callsFake(user => generateToken(user));

      // Mock the context with the decoded user
      const context = { user: null, res: { cookie: sinon.stub() } };

      const result = await resolvers.Mutation.loginUser(null, {
        email: 'bob@example.com',
        password: plainPassword
      }, context);

      expect(result.user).to.deep.equal(user);
      expect(verifyToken(result.token)).to.not.be.null;

      sinon.restore();
      logger.info('loginUser test passed successfully');
    } catch (error) {
      logger.error(`Error in loginUser test: ${error.message}`);
      throw error;
    }
  });
});
