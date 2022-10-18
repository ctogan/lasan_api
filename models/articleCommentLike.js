'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCommentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleCommentLike.init({
    article_comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ArticleCommentLike',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return ArticleCommentLike;
};