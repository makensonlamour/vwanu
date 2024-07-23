/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';
import { ErrorCodeInterface } from '../schema/errorCode.schema';

export default (sequelize: any, DataTypes: any) => {
  class ErroCode extends Model<ErrorCodeInterface> implements ErrorCodeInterface {
   error_code: string
   error_message :string
   description:string

    static associate(models: any): void {
      
    }
  }
  ErroCode.init(
    {
      error_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique:true
      },

      error_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      
      sequelize,
      modelName: 'ErroCodes',
      tableName:'error_codes',
      underscored:true,
      timestamps:false,
    }
  );
  return ErroCode;
};
