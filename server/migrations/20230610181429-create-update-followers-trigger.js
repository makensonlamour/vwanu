module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER tr_increment_follower_counts
    AFTER INSERT OR DELETE ON "User_Follower"
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_followers_counts();`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS increment_follower_counts ON "User_follower";`);
  },
};
