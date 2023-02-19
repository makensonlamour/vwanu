INSERT INTO "Users" 
  ("id","firstName","lastName", "admin", "email", "password","createdAt", "updatedAt" )
  VALUES (?, ?, ?,?,?,?, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;