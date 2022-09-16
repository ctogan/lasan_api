// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Article.belongsTo(models.Topic,{
//         foreignKey:'id',
//         as:'roles'
//     })
//     }
//   }
//   User.init({
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true
//     },
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     avatar: DataTypes.STRING,
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     is_verified: DataTypes.BOOLEAN,
//     gender: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    gender: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    // User.belongsToMany(models.Role, {
    //   through: 'UserRoles',
    //   foreignKey: 'userId',
    //   otherKey: 'roleId',
    //   as: "roles"
    // });

    // User.hasMany(models.Status, {
    //   foreignKey: 'user_id',
    //   as: 'statuses',
    // });
  };
  return User;
};