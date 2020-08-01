module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: DataTypes.STRING
    })
  
  
    return Todo;
};