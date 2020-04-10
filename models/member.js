'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Member extends Model{}

  Member.init({
    ProjectId: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      validate:{
        isUnik(UserId, done){
          Member.findOne({
            where:{
              UserId,
              ProjectId : this.ProjectId
            }
          })
            .done((result)=>{
              if(result){
                return done(new Error('User alerdy in this project'))
              }
              return done()
            })  
        }
      }
    },
    Owner: DataTypes.INTEGER
  }, {sequelize})

  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.Project ,{foreignKey:'ProjectId', onDelete: 'cascade'})
  };
  return Member;
};