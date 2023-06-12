module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE OR REPLACE PROCEDURE proc_remove_follower(userId UUID, followerId UUID)
LANGUAGE 'plpgsql'
AS $$
DECLARE
    is_transaction_active BOOLEAN;
BEGIN
 -- Check if a transaction is already active
    SELECT INTO is_transaction_active (current_transaction() IS NOT NULL);
    -- Begin a new transaction if no transaction is active
    IF NOT is_transaction_active THEN
        BEGIN
    END IF;
    -- Check if the userId and followerId exist in the database
    IF NOT EXISTS (
        SELECT 1
        FROM "public"."User_Follower"
        WHERE "UserId" = userId AND "FollowerId" = followerId
    ) THEN

            -- Rollback the transaction if userId doesn't exist
        IF NOT is_transaction_active THEN
            ROLLBACK;
            END;
        END IF;
        -- Throw an error if record doesn't exist
        RAISE EXCEPTION 'You are not following this person';
    END IF;

    -- Remove the follower from the followers table
    DELETE FROM "public"."User_Follower"
    WHERE "UserId" = userId AND "FollowerId" = followerId;

    COMMIT;
EXCEPTION
    WHEN others THEN
        ROLLBACK;
        RAISE;
END;
$$;
    
    
    
    
    `);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP PROCEDURE IF EXISTS proc_remove_follower'
    );
  },
};
