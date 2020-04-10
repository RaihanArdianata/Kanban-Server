'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const {Model} = sequelize.Sequelize

  class Project extends Model{}

  Project.init({
    project_name: DataTypes.STRING,
    Owner: DataTypes.INTEGER
  }, {sequelize})

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User,{
      through: 'Member',
      foreignKey: 'ProjectId',
      onDelete: 'cascade'
    })

    Project.belongsTo(models.User,{foreignKey:'Owner', onDelete: 'cascade'})

    Project.hasMany(models.Member)

    Project.hasMany(models.SubTask, {foreignKey:"ProjectId" , onDelete: 'cascade'})
  };
  return Project;
};