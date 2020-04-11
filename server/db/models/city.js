const Sequelize = require('sequelize');
const db = require('../db');

const City = db.define('city', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.INTEGER
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

//doesn't have latitude/longitude

module.exports = City;