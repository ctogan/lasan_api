'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.Topic,{
          foreignKey:'id',
          as:'topic'
      })
    }
  }
  Article.init({
    topic_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    article: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};