var Employee = require("./Employee")
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

const EmpSalary = sequelize.define('emp_salary', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  salary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  monthly_salary: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  eff_date_ch: {
    type: Sequelize.DATE

  },
  emp_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }



});
// EmpSalary.belongsTo(Employee, {foreignKey: 'emp_id'});
// EmpSalary.sync({force: true});
// force: true will drop the table if it already exists
/* EmpSalary.sync({force: true}).then(() => {
 // Table created
 return Admins.create({
   firstname: 'panna',
   emailid:"pdas@xebia.com",
   lastName: 'das',
   username:"XI728",
   password:"panna"
 });
});  */

module.exports = EmpSalary;