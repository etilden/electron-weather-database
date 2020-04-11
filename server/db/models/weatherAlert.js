const Sequelize = require('sequelize'); 
const db = require('../database');

const WeatherAlert = db.define('weatherAlert', {
  alertTime: {
    type: Sequelize.TIME
  },
  alertDays: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekdays', 'Weekends']]
    }
  },
  targetTime: {
    type: Sequelize.TIME
  }
})

module.exports = WeatherAlert