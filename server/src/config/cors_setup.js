const cors = require("cors");

const cors_setup = cors({
  origin: ["http://localhost:7000", "http://localhost:5000"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"],
});

module.exports = cors_setup;
