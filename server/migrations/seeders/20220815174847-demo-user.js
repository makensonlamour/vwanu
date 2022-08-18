

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Vwanu',
        lastName: 'Teamhead',
        email: 'vwanu1@vwanu.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '$2a$10$E1Z.q.X.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.',
      },
      {
        firstName: 'Vwanu2',
        lastName: 'Teamhead1',
        email: 'vwanu2@vwanu.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '$2a$10$E1Z.q.X.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.',
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
