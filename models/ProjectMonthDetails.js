var EmpProjectMap=require("./EmpProjectMap")
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
  
const ProjectMonthDetails = sequelize.define('ProjectMonthDetails', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ideal_hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
 
  });
  
  //ProjectMonthDetails.belongsTo(EmpProjectMap, {foreignKey: 'emp_project_id'});
  //ProjectMonthDetails.sync({force: true});
  // force: true will drop the table if it already exists
   /* ProjectMonthDetails.sync({force: true}).then(() => {
    // Table created
    return Admins.create({
      firstname: 'panna',
      emailid:"pdas@xebia.com",
      lastName: 'das',
      username:"XI728",
      password:"panna"
    });
  });  */
 
  module.exports=ProjectMonthDetails;