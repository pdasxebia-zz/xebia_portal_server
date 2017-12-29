var Employee=require("./Employee")
var Projects=require("./Projects")
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
  
const Address = sequelize.define('address', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    address_type: {
        type: Sequelize.STRING,
        allowNull: false,
        values:["home","permanent"]
      },
      add_line1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      add_line2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    
  });

  //Address.belongsTo(Employee, {foreignKey: 'emp_id'});
  //Address.sync({force: true});
  //Address.belongsTo(Projects, {foreignKey: 'project_id'});
  
  // force: true will drop the table if it already exists
   /* Address.sync({force: true}).then(() => {
    // Table created
    return Admins.create({
      firstname: 'panna',
      emailid:"pdas@xebia.com",
      lastName: 'das',
      username:"XI728",
      password:"panna"
    });
  });  */
 
  module.exports=Address;