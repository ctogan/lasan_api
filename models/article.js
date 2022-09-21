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
      // Article.belongsTo(models.Topic,{
      //     foreignKey:'id',
      //     as:'topic'
      // })
    }
  }
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topic_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    article: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    slug: DataTypes.STRING,
    total_likes: DataTypes.INTEGER,
    total_views: DataTypes.INTEGER,
    total_whistlists: DataTypes.INTEGER,
    reading_time: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Article',
    tableName:'articles',
    createdAt: "created_at",
    updatedAt: "updated_at",
    
  });
  return Article;
};