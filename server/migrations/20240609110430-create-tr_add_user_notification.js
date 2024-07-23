module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER tr_add_user_notification
    AFTER INSERT ON "Users"
    FOR EACH ROW
    EXECUTE FUNCTION fn_add_user_notification();`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS tr_add_user_notification ON "Users";`);
  },
};
