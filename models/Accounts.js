
const Sequelize = require('sequelize');
const sequelize = new Sequelize('xebia_portal', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Accounts = sequelize.define('accounts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,

    allowNull: false,

  },

});

//Accounts.sync({force: true});
// force: true will drop the table if it already exists
/* Accounts.sync({force: true}).then(() => {
 // Table created
 return Admins.create({
   firstname: 'panna',
   emailid:"pdas@xebia.com",
   lastName: 'das',
   username:"XI728",
   password:"panna"
 });
});  */

module.exports = Accounts;