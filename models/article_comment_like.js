'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article_comment_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article_comment_like.init({
    article_comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'article_comment_like',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return article_comment_like;
};