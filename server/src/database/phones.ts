/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

// Custom imports

import { PhoneInterface } from '../schema/phoneNumbers.schema';

export default (sequelize: any, DataTypes: any) => {
  class Phone extends Model<PhoneInterface> implements PhoneInterface {
    id: string
    phone_number: string
    // phone_type:string
    country_code :string

    // static associate(models: any) {
    //   PhoneNumbers.belongsToMany(models.Users, {
    //     through:"phone_verifications",
    //     onDelete: 'CASCADE',
    //   });
    // }
  }
  Phone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // phone_type: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   references:{
      //     model:'address-types',
      //     key: 'id',
      //   }
      // },
      country_code: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
          model:'Countries',
          key:'id'
        }
      },

      
    },
    {
      sequelize,
      modelName: 'Phone',
      tableName:'phones',
      underscored:true,

    }
  );
  return Phone;
};
