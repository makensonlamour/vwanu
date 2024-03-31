CREATE OR REPLACE FUNCTION remove_banned_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM "CommunityUsers"
  WHERE "UserId" = NEW.user_id AND "CommunityId" = NEW.community_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
