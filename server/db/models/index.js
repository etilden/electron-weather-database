const User = require('./user'); 
const WeatherAlert = require('./weatherAlert');
const City = require('./city')

WeatherAlert.belongsTo(User);
User.hasMany(WeatherAlert); 

User.hasOne(City);

module.exports = {
  User, 
  WeatherAlert, 
  City
}
