const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` });

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        admin: true,
        updatedAt: new Date(),
        createdAt: new Date(),
        email: process.env.ROOT_USER_EMAIL,
        password: process.env.ROOT_USER_PASSWORD,
        lastName: process.env.ROOT_USER_LAST_NAME,
        firstName: process.env.ROOT_USER_FIRST_NAME,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
