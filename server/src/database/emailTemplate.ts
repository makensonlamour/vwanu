/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

// Custom imports

import { EmailTemplateInterface } from '../schema/htmlEmails';

export default (sequelize: any, DataTypes: any) => {
  class EmailTemplates extends Model implements EmailTemplateInterface {
    id: number;

    subject: string;

    body: string;

    snug: string;

    // eslint-disable-next-line no-unused-vars
    static associate(models: any) {
      // define association here
    }
  }
  EmailTemplates.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      snug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'EmailTemplate',
    }
  );
  return EmailTemplates;
};
