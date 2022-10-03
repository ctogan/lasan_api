'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.hasMany(models.Article,{
          foreignKey:'topic_id',
          as:'article'
      })
      Topic.hasMany(models.userTopic,{
        foreignKey:'topic_id',
        as:'usertopic'
      })

    }
  }
  Topic.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topic: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Topic',
    tableName:'topics',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return Topic;
};