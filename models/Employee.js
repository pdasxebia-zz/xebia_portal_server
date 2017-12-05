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
  
const Employee = sequelize.define('employee', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
        }
      },
      email: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
        }
      },
      phone: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
        }
      },
      emp_type: {
        type: Sequelize.STRING,
        unique:'compositeIndex',
        allowNull: false,
        validate:{
            notEmpty:true,
            isEmail:true,
        }
      },

      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [ 'soft_blocked', 'resigned','long_leave','deployable','staffed','exited'],
      },
      
    doj: {
      type: Sequelize.DATE
      
    },
    title: {
      type: Sequelize.STRING
    },
    exit: {
      type: Sequelize.DATE
      },
      noSqlRefId: {
          type: Sequelize.STRING
        },
        role: {
            type: Sequelize.INTEGER
          }
        


  });
  //Employee.sync({force: true});
  // force: true will drop the table if it already exists
   /* Employee.sync({force: true}).then(() => {
    // Table created
    return Admins.create({
      firstname: 'panna',
      emailid:"pdas@xebia.com",
      lastName: 'das',
      username:"XI728",
      password:"panna"
    });
  });  */
 
  module.exports=Employee;