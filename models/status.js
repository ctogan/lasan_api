// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Status extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Status.init({
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true
//     },
//     title: DataTypes.STRING,
//     body: DataTypes.STRING,
//     user_id: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Status',
//   });
//   return Status;
// };
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
    Status.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return Status;
};