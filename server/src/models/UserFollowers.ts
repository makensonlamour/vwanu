/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

// import { Model } from 'sequelize';

module.exports = (sequelize) => {
  const UserFollower = sequelize.define(
    'UserFollower',
    {},
    {
      freezeTableName: true,
    }
  );

  UserFollower.associate = function (models) {
    UserFollower.belongsTo(models.User, {
      as: 'follower',
      onDelete: 'CASCADE',
    });
    UserFollower.belongsTo(models.User, {
      as: 'followed',
      onDelete: 'CASCADE',
    });
  };

  return UserFollower;
};
