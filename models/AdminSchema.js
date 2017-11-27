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
  
const Admins = sequelize.define('admin', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    username: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
        }
      },
      emailid: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
            isEmail:true,
        }
      },
      
    firstname: {
      type: Sequelize.STRING
      
    },
    lastName: {
      type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
      },
      noSqlRefId: {
          type: Sequelize.STRING
        },
        role: {
            type: Sequelize.INTEGER
          }
        


  });
  
  // force: true will drop the table if it already exists
   /* Admins.sync({force: true}).then(() => {
    // Table created
    return Admins.create({
      firstname: 'panna',
      emailid:"pdas@xebia.com",
      lastName: 'das',
      username:"XI728",
      password:"panna"
    });
  });  */
 
  module.exports=Admins;