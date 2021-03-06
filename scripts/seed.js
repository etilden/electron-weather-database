const db = require('../server/db');
// const cities = require("./city.list.json")
const cities = require("./cities.list.json");

const {City, User, WeatherAlert} = require("../server/db/models");

const citySeed = cities.filter(city => city.state ? city : null)

const userSeed = [
  {
    firstName: "Emma", 
    lastName: "Tilden", 
    userName: "emma", 
    email: "e.k.tilden@gmail.com", 
    password: "12345678",
    cityId: 4046319
  }, {
    firstName: "Lemma", 
    lastName: "Lilden", 
    userName: "lemma", 
    email: "l.l.lilden@lmail.lom", 
    password: "12345678",
    cityId: 4046319
  }
]

const alertSeed = [
  {
    userId: 1, 
    alertTime: '13:00',
    alertDays: ['Weekends'],
    targetTime: '15:00'
  },
  {
    userId: 1, 
    alertTime: '14:00',
    alertDays: ['Weekends'],
    targetTime: '17:00'
  }
]


const seed = async () => {
  await db.sync({ force: true });
  const cities = await City.bulkCreate(citySeed);
  const users = await User.bulkCreate(userSeed);
  const alerts = await WeatherAlert.bulkCreate(alertSeed);

  console.log(`${cities.length} cities created`);
  console.log(`${users.length} users created`);
  console.log(`${alerts.length} alerts created`);
};

const runSeed = async () => {
  try {
    await seed();
    console.log("success!");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

runSeed();