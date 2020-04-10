'use strict';
const {encode_password} =  require('../helper/bcrypt.js')
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isUnik(email, done){
          User.findOne({
            where:{
              email
            }
          })
            .done((result)=>{
              if(result){
                return done(new Error('Email Alery In Use'))
              }
              return done()
            })  
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encode_password(user.password);
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Project,{
      through: 'Member',
      foreignKey: 'UserId',
      onDelete: 'cascade'
    })


    User.hasMany(models.Project,{
      foreignKey: 'Owner',
      onDelete: 'cascade'
    })

  };
  return User;
};