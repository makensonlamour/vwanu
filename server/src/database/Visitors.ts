/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';
// Custom imports

interface VisitorInterface {}
export default (sequelize: any, DataTypes: any) => {
  class Visitor extends Model<VisitorInterface> implements VisitorInterface {
    id: number | undefined;

    // UserId: number;

    // VisitorId: number;

    static associate(models: any) {
      Visitor.belongsTo(models.User, {
        as: 'Visitor',
        constraints: false,
      });

      Visitor.belongsTo(models.User, {
        as: 'User',
        constraints: false,
      });
    }
  }
  Visitor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      //   UserId: {
      //     type: DataTypes.INTEGER,
      //   },
      //   VisitorId: {
      //     type: DataTypes.INTEGER,
      //   },
    },
    {
      sequelize,
      modelName: 'Visitor',
    }
  );
  return Visitor;
};
