'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      UserStory.belongsTo(models.User,{
        foreignKey:'user_id',
        as:'author'
      })


      UserStory.belongsTo(models.Article,{
        foreignKey:'article_id',
        as:'article'
      })
    }
  }
  UserStory.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserStory',
    tableName:'user_stories',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserStory;
};