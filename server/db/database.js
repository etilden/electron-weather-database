const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

// const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name

const dbName = "weatherMark"

console.log(chalk.yellow(`Opening database connection to ${dbName}`))

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, {
  logging: false,
})

// db.authenticate()
// .then(() => {
//     console.log('Connection successfully made.');
// })
// .catch(err => {
//     console.error('Error connecting to database', err);
// });

// db.sync({force: true})

module.exports = db