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

      ArticleComments.belongsTo(models.User,{
        foreignKey:'user_id',
        as:'user'
      });

      ArticleComments.belongsTo(models.Article,{
        foreignKey:'article_id',
        as:'article'
      });

      ArticleComments.hasMany(models.ArticleCommentLikes,{
        foreignKey:'article_comment_id',
        as:'comment_like'
      });
     
      ArticleComments.hasMany(models.ArticleComments, 
      { 
          foreignKey  : 'parent_id', 
          as          : 'comment_replies', 
          
      });

    }
  }
  ArticleComments.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    article_id: DataTypes.INTEGER,
    parent_id:DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    status: DataTypes.STRING,
    media: DataTypes.STRING,
    total_comment_like: DataTypes.STRING,
    total_comment_reply: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'ArticleComments',
    tableName: 'article_comments',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return ArticleComments;
};