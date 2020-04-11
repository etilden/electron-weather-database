const User = require('./user'); 
const WeatherAlert = require('./weatherAlert');
const City = require('./city')

WeatherAlert.belongsTo(User);
User.hasMany(WeatherAlert); 

User.hasOne(City); 
City.hasMany(User); 

module.exports = {
  User, 
  WeatherAlert, 
  City
}
