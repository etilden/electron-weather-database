const User = require('./user'); 
const WeatherAlert = require('./weatherAlert');
const City = require('./city')

WeatherAlert.belongsTo(User);
User.hasMany(WeatherAlert); 

City.hasMany(User);
User.belongsTo(City)

module.exports = {
  User, 
  WeatherAlert, 
  City
}
