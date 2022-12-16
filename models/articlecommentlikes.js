'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCommentLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ArticleCommentLikes
      // ArticleCommentLikes.belongsTo(models.ArticleComments,{
      //   foreignKey:'article_comment_id',
      //   as:'comment_like'
      // });

    }
  }
  ArticleCommentLikes.init({
    article_comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ArticleCommentLikes',
    tableName: 'article_comment_likes',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return ArticleCommentLikes;
};