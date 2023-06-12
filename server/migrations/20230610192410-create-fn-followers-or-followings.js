module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
CREATE OR REPLACE FUNCTION get_followers_or_following(
    user_id UUID,
    is_followers BOOLEAN DEFAULT TRUE
)
RETURNS SETOF "Users"
AS $$
BEGIN
    IF is_followers THEN
        RETURN QUERY
        SELECT u.*
        FROM "Users" u
        INNER JOIN "User_Follower" uf ON u.id = uf."FollowerId"
        WHERE uf."UserId" = user_id;
    ELSE
        RETURN QUERY
        SELECT u.*
        FROM "Users" u
        INNER JOIN "User_Follower" uf ON u.id = uf."UserId"
        WHERE uf."FollowerId" = user_id;
    END IF;
END;
$$ LANGUAGE plpgsql;`);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS get_followers_or_following();'
    );
  },
};
