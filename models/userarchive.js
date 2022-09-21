'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserArchive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserArchive.init({
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserArchive',
    tableName: 'user_archives',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserArchive;
};