'use strict';
const {
  Model
} = require('sequelize');
const { user } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article,{
          foreignKey:'user_id',
          as:'article'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
      uuid: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      is_verified: DataTypes.BOOLEAN,
      gender: DataTypes.STRING,
      slug: DataTypes.STRING,
      occupation: DataTypes.STRING,
      token: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return User;
};