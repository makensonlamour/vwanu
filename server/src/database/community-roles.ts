/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityRolesInterface {
  id: string;
  name: string;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityRoles
    extends Model<CommunityRolesInterface>
    implements CommunityRolesInterface
  {
    id: string;

    name: string;

    // static associate(models: any): void {
    //   CommunityRoles.belongsToMany(models.Community, {
    //     through: 'CommunityUsers',
    //     onDelete: 'CASCADE',
    //   });
    // }
  }
  CommunityRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
    },

    {
      sequelize,
      modelName: 'CommunityRoles',
    }
  );
  return CommunityRoles;
};
