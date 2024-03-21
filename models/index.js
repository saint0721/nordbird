const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const User = require('./user')
const Hashtag = require('./hashtag')
const Post = require('./post')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
  sequelize,
  Sequelize,
  User: User.init(sequelize),
  Hashtag: Hashtag.init(sequelize),
  Post: Post.init(sequelize)
}

Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db))

module.exports = db