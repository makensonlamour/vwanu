/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

// Custom imports
import { MessageTemplateInterface } from '../schema/messageTemplate';

export default (sequelize: any, DataTypes: any) => {
  class Templates extends Model implements MessageTemplateInterface {
    id: string;

    snug: string;

    // eslint-disable-next-line no-unused-vars
    static associate(models: any) {
      // define association here
    }
  }
  Templates.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },

      snug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Template',
    }
  );
  return Templates;
};
