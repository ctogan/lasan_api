// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Role extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
      
//     }
//   }
//   Role.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true
//   },
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Role',
//   });
//   return Role;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment: true
    },
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    // Role.belongsToMany(models.User, {
    //   through: 'UserRoles',
    //   foreignKey: 'roleId',
    //   otherKey: 'userId'
    // });
  };
  Role.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  return Role;
};