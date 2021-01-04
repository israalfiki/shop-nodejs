const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "2832018", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize