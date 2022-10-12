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
        as:'author'
      })

      ArticleComments.hasMany(models.ArticleComments, 
        { 
            foreignKey  : 'parent_id', 
            as          : 'child', 
            
        });

        // ArticleComments.belongsToMany(ArticleComments, 
        // { 
        //     through     : models.ArticleComments,
        //     foreignKey  : 'parent_id', 
        //     as          : 'child', 
        //     targetKey   : 'id'
        // });
  
      // ArticleComments.belongsTo(models.ArticleComments,{
      //   foreignKey:'parent_id',
      //   targetKey: "id"
      // })
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
    is_like: DataTypes.STRING,
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