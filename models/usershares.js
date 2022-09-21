'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserShares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserShares.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    media: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserShares',
    tableName: 'user_shares',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserShares;
};