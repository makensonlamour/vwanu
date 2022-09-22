module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'b073cb03-27ae-43d9-ae56-4871d69c7243',
        firstName: 'Vwanu',
        lastName: 'Teamhead',
        email: 'vwanu1@vwanu.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '$2a$10$E1Z.q.X.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.Q.',
      },
      {
        id: 'b073cb03-27ae-43d9-ae56-4871d69c7244',
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
