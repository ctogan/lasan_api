'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFollows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFollows.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserFollows',
    tableName: 'user_follows',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserFollows;
};