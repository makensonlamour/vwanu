/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class htmlEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  htmlEmail.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      subject: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'htmlEmail',
    }
  );
  return htmlEmail;
};
