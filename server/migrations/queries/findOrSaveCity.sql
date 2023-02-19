  INSERT INTO "Cities" 
  ("id", "name", "StateId", "createdAt", "updatedAt" )
  VALUES (?, ?, ?, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;