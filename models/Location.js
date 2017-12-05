
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
  
const Locations = sequelize.define('location', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     
  });
  //Locations.belongsTo(Employee, {foreignKey: 'emp_id'});
  //Locations.sync({force: true});
  // force: true will drop the table if it already exists
   /* Locations.sync({force: true}).then(() => {
    // Table created
    return Admins.create({
      firstname: 'panna',
      emailid:"pdas@xebia.com",
      lastName: 'das',
      username:"XI728",
      password:"panna"
    });
  });  */
 
  module.exports=Locations;