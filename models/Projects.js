var Accounts = require("./Accounts")
var Locations = require("./Location")
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

const Projects = sequelize.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  manager: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  account_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },



});

//Projects.belongsTo(Locations, {foreignKey: 'location_id'});
//Projects.belongsTo(Accounts, {foreignKey: 'account_id'});
//Projects.sync({force: true});



// force: true will drop the table if it already exists
/* Projects.sync({force: true}).then(() => {
 // Table created
 return Admins.create({
   firstname: 'panna',
   emailid:"pdas@xebia.com",
   lastName: 'das',
   username:"XI728",
   password:"panna"
 });
});  */

module.exports = Projects;