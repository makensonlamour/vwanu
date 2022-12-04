/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface DiscussionInterface {
  id: string;
  body: string;
  title: string;
  privacyType: string;
  banned: boolean;
  bannedReason: string;
  locked: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Discussion
    extends Model<DiscussionInterface>
    implements DiscussionInterface
  {
    id: string;

    body: string;

    title: string;

    privacyType: string;

    banned: boolean;

    bannedReason: string;

    locked: boolean;

    static associate(models: any): void {
      Discussion.belongsTo(models.User);
      Discussion.belongsToMany(models.Media, {
        through: 'Discussion_Media',
      });
      Discussion.belongsToMany(models.ForumCategory, {
        through: 'Discussion_ForumCategory',
        as: 'forum_discussion',
      });
      Discussion.belongsTo(models.Community);
      Discussion.hasMany(models.Discussion, { as: 'Comments' });
      Discussion.hasMany(models.Reaction, {
        foreignKey: 'entityId',
        constraints: false,
        scope: {
          entityType: 'Discussion',
        },
      });
    }
  }
  Discussion.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      bannedReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      privacyType: {
        type: DataTypes.STRING,
        defaultValue: 'public',
      },
    },

    {
      sequelize,
      modelName: 'Discussion',
    }
  );
  return Discussion;
};
