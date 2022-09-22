const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommunityRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  CommunityRoles.init(
    {
      id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'CommunityRoles',
    }
  );
  return CommunityRoles;
};
