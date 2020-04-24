const Sequelize = require('sequelize');
const db = require('../database');

const City = db.define('city', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

//doesn't have latitude/longitude

module.exports = City;