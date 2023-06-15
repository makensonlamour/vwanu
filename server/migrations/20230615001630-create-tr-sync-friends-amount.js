module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER tr_sync_friends_amount
    AFTER INSERT OR DELETE ON "User_friends"
    FOR EACH ROW
    EXECUTE FUNCTION fn_sync_amount_of_friends();`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS tr_sync_friends_amount ON "User_friends";`);
  },
};
