module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `Alter Table "CommunityUsers" Add Constraint "CommunityUsersUnique" Unique ("CommunityRoleId" , "CommunityId" , "UserId")`
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CommunityUsersContraints');
  },
};
