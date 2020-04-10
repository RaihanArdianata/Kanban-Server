'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Task extends Model{}

  Task.init({
    task_name: DataTypes.STRING,
    // ProjectId: DataTypes.INTEGER
  }, {sequelize})

  Task.associate = function(models) {
    // associations can be defined here
    Task.hasMany(models.SubTask, {
      foreignKey:"Category",
      onDelete:"cascade"
    })
  };
  return Task;
};