/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface ServiceInterface {
  id: string;
  name: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Service extends Model<ServiceInterface> implements ServiceInterface {
    id: string;

    name: string;

    static associate(models: any): void {}
  }
  Service.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};
