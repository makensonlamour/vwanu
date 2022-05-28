/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface AlbumInterface {
  id: number;
  name: string;
  privacyType: string;
  coverPicture: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Album extends Model<AlbumInterface> implements AlbumInterface {
    id: number;

    name: string;

    privacyType: string;

    coverPicture: string;

    static associate(models: any): void {
      Album.belongsTo(models.User);
      Album.belongsToMany(models.Media, {
        through: 'Album_Media',
        as: 'Medias',
      });
    }
  }
  Album.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      privacyType: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },
    },

    {
      // hooks: {
      //   afterFind: (name, option) => {
      //     // console.log('\n\n\n Some thing ');
      //     // console.log({name, option});
      //   },
      // },
      sequelize,
      modelName: 'Album',
    }
  );
  return Album;
};
