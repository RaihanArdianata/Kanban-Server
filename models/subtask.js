'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class SubTask extends Model{}

  SubTask.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ProjectId: DataTypes.INTEGER,
    Category: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {sequelize})

  SubTask.associate = function(models) {
    // associations can be defined here
    SubTask.belongsTo(models.Task, {
      foreignKey:"Category",
      onDelete: 'cascade'
    })
    SubTask.belongsTo(models.Project, {
      foreignKey:"ProjectId",
      onDelete: 'cascade'
    })

    SubTask.belongsTo(models.User,{
      foreignKey:"UserId",
      onDelete: 'cascade'
    })
  };
  return SubTask;
};