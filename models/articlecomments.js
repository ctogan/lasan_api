'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleComments.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    article_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    status: DataTypes.STRING,
    media: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ArticleComments',
    tableName: 'article_comments',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return ArticleComments;
};