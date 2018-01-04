var Employee = require("./Employee")
var Projects = require("./Projects")
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

const EmpProjectMap = sequelize.define('EmpProjectMap', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  allocation: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },


  start_date: {
    type: Sequelize.DATE

  },
  end_date: {
    type: Sequelize.DATE

  },
  emp_id: {
    type: Sequelize.INTEGER

  },
  project_id: {
    type: Sequelize.INTEGER

  }
});

//EmpProjectMap.belongsTo(Employee, {foreignKey: 'emp_id'});
//EmpProjectMap.belongsTo(Projects, {foreignKey: 'project_id'});
//EmpProjectMap.sync({force: true});
// force: true will drop the table if it already exists
/* EmpProjectMap.sync({force: true}).then(() => {
 // Table created
 return Admins.create({
   firstname: 'panna',
   emailid:"pdas@xebia.com",
   lastName: 'das',
   username:"XI728",
   password:"panna"
 });
});  */

module.exports = EmpProjectMap;