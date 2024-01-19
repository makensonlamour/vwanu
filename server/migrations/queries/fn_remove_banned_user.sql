CREATE OR REPLACE FUNCTION remove_banned_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM community_users
  WHERE user_id = NEW.user_id AND community_id = NEW.community_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
