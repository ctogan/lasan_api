'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userTopic.belongsTo(models.Topic,{
        foreignKey:'id',
        as:'topic'
    })
    }
  }
  userTopic.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topic_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userTopic',
    tableName:'user_topics',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return userTopic;
};