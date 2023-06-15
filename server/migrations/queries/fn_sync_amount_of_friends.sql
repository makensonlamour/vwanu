CREATE OR REPLACE FUNCTION fn_sync_amount_of_friends()
    RETURNS TRIGGER AS $$
  BEGIN
  IF TG_OP = 'INSERT' THEN
      -- Increment the followers count for the user being followed
       UPDATE "Users"
       SET "amountOfFriend" = "amountOfFriend" + 1
       WHERE id = NEW."UserId";
  ELSIF TG_OP = 'DELETE' THEN
      -- Decrement the followers count for the user being unfollowed
       UPDATE "Users"
       SET "amountOfFriend" = "amountOfFriend" - 1
       WHERE id = OLD."UserId";
   END IF;
    
    RETURN null;
  END;
$$ LANGUAGE plpgsql;