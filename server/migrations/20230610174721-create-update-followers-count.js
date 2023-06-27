module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
CREATE OR REPLACE FUNCTION fn_update_followers_counts()
    RETURNS TRIGGER AS $$
  BEGIN
  IF TG_OP = 'INSERT' THEN
      -- Increment the followers count for the user being followed
       UPDATE "Users"
       SET "amountOfFollower" = "amountOfFollower" + 1
       WHERE id = NEW."UserId";
      -- Increment the following count for the follower
       UPDATE "Users"
       SET "amountOfFollowing" = "amountOfFollowing" + 1
       WHERE id = NEW."FollowerId";
  ELSIF TG_OP = 'DELETE' THEN
      -- Decrement the followers count for the user being unfollowed
       UPDATE "Users"
       SET "amountOfFollower" = "amountOfFollower" - 1
       WHERE id = OLD."UserId";
      -- Decrement the following count for the follower
       UPDATE "Users"
       SET "amountOfFollowing" = "amountOfFollowing" - 1
       WHERE id = OLD."FollowerId";
   END IF;
    
    RETURN null;
  END;
$$ LANGUAGE plpgsql;
`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      `DROP FUNCTION IF EXIST fn_update_followers_counts();`
    );
  },
};
