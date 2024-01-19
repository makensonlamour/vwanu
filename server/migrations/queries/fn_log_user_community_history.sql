CREATE OR REPLACE FUNCTION log_user_community_history()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO community_history (user_id, community_id, joined, created_at)
    VALUES (NEW.user_id, NEW.community_id, true, CURRENT_TIMESTAMP);
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO community_history (user_id, community_id, joined, created_at)
    VALUES (OLD.user_id, OLD.community_id, false, CURRENT_TIMESTAMP);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;