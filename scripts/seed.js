const db = require('../server/db');
const citySeed = require("./city.list.json")
// const citySeed = require("./city.test.json");

const {City, User, WeatherAlert} = require("../server/db/models");

const userSeed = [
  {
    firstName: "Emma", 
    lastName: "Tilden", 
    userName: "emma", 
    email: "e.k.tilden@gmail.com", 
    password: "12345678",
    locationId: 833
  }, {
    firstName: "Lemma", 
    lastName: "Lilden", 
    userName: "lemma", 
    email: "l.l.lilden@lmail.lom", 
    password: "12345678",
    locationId: 833
  }
]

const alertSeed = [
  {
    userId: 1, 
    alertTime: '13:00',
    alertDays: ['Weekends']
  },
  {
    userId: 1, 
    alertTime: '14:00',
    alertDays: ['Weekends']
  }
]


const seed = async () => {
  await db.sync({ force: true });
  const users = await User.bulkCreate(userSeed);
  const cities = await City.bulkCreate(citySeed);
  const alerts = await WeatherAlert.bulkCreate(alertSeed);

  console.log(`${cities.length} activities created`);
  console.log(`${users.length} users created`);
  console.log(`${alerts.length} companies created`);
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