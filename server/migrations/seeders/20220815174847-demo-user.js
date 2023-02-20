const fs = require('fs');
const path = require('path');
const config = require('config');
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');

const query = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertAppUsers.sql'),
  'utf-8'
);
const HASHING_SALT_ROUNDS = parseInt(config.get('HASHING_SALT_ROUNDS'), 10);
const appUsers = [
  {
    id: v4(),
    admin: true,
    updatedAt: new Date(),
    createdAt: new Date(),
    email: config.get('ROOT_USER_EMAIL'),
    password: config.get('ROOT_USER_PASSWORD'),
    lastName: config.get('ROOT_USER_LAST_NAME'),
    firstName: config.get('ROOT_USER_FIRST_NAME'),
  },
];

module.exports = {
  async up(queryInterface) {
    await Promise.all(
      appUsers.map((appUser) =>
        queryInterface.sequelize.query(query, {
          replacements: [
            v4(),
            appUser.firstName,
            appUser.lastName,
            appUser.admin,
            appUser.email,
            bcrypt.hashSync(appUser.password, HASHING_SALT_ROUNDS),
          ],
          type: QueryTypes.SELECT,
        })
      )
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
