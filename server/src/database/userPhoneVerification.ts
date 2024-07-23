/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

// Custom imports

import { nanoid } from 'nanoid';
import { UserPhoneVerificationsInterface } from '../schema/UserPhoneVerifications.schema';

export default (sequelize: any, DataTypes: any) => {
  class UserPhoneVerifications extends Model<UserPhoneVerificationsInterface> implements UserPhoneVerificationsInterface {
    user_id: string
    phone_id: string
    verification_code: number
    code_sent_time: string
    verified_time: string
    is_verified: boolean

    // static associate(models: any) {
    //   PhoneNumbers.belongsToMany(models.Users, {
    //     through:"phone_verifications",
    //     onDelete: 'CASCADE',
    //   });
    // }
  }
  UserPhoneVerifications.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      phone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id'
        }
      },
      verification_code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: nanoid(),
      },
      code_sent_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      verified_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }


    },
    {
      sequelize,
      modelName: 'UserPhoneVerifications',
      tableName: 'user_phone_verifications',
      underscored: true,

    }
  );
  return UserPhoneVerifications;
};
