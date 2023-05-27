  INSERT INTO "Templates" 
  ("id","snug","type", "createdAt", "updatedAt" )
  VALUES (?, ?, ?,current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;