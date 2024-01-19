module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `Alter Table community_users ADD Constraint community_users_unique Unique ("community_role_id" , "community_id" , "user_id")`
    );
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP Constraint community_users_unique'
    );
  },
};
