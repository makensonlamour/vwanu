  INSERT INTO "Templates" 
  ("id","snug", "createdAt", "updatedAt" )
  VALUES (?, ?, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;