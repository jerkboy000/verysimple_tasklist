const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require("chai-http");
const logger = require("../src/config/logger");

chai.use(sinonChai);
chai.use(chaiHttp);

// Setting up a global expect variable
global.expect = chai.expect;

logger.info("Chai setup completed successfully");
