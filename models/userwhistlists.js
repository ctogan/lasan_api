'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWhistlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWhistlists.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserWhistlists',
    tableName: 'user_whistlists',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserWhistlists;
};