/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface KoremInterface {
  id: string;
  entityId: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Korem extends Model<KoremInterface> implements KoremInterface {
    id: string;

    entityId: string;

    static associate(models: any): void {
      Korem.belongsTo(models.User);
      Korem.belongsTo(models.Service);
    }
  }
  Korem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      entityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Korem',
    }
  );
  return Korem;
};
