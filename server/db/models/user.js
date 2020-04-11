const Sequelize = require('sequelize'); 
const db = require('../database'); 
const crypto = require('crypto');

const User = db.define(
  'user', {
    userName: {
      type: Sequelize.STRING, 
      allowNull: false, 
      unique: true
    }, 
    email: {
      type: Sequelize.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true, 
        notEmpty: true
      }
    }, 
    password: {
      type: Sequelize.STRING, 
      allowNull: false,
      len: {
        min: [8]
      },
      validate: {
        notEmpty: true,
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
      return () => this.getDataValue('salt')
      }
    },
    locationId: {
      type: Sequelize.INTEGER
    }
  }
)

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

