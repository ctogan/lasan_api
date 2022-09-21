'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLike.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserLike',
    tableName: 'user_likes',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserLike;
};