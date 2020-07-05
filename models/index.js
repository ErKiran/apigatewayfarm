const Sequelize = require("sequelize");

const dbConfig = require("../config/db");

const UserModel = require('./user');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const User = UserModel(sequelize,Sequelize)


    
sequelize.sync({
 logging: console.log,
 });
    
sequelize
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
.catch(err => {
console.error('Unable to connect to the database:', err); });    

module.exports={
    User,
}