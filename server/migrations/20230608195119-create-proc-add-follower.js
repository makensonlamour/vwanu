module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
CREATE OR REPLACE PROCEDURE proc_add_follower(follower UUID, following UUID)
LANGUAGE 'plpgsql'
AS $$ 
BEGIN
   
  -- Insert the follower
    INSERT INTO "public"."User_Follower" ("UserId", "FollowerId", "createdAt", "updatedAt")
    VALUES (following, follower, current_timestamp, current_timestamp);

    -- Commit the transaction 
        COMMIT;
END;
$$;
`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.querry(
      `DROP PROCEDURE IF EXIST proc_add_follower`
    );
  },
};
