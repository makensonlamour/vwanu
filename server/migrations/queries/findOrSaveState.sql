INSERT INTO "States" 
("id", "name", "CountryId", "initials", "createdAt", "updatedAt" )
  VALUES (?, ?, ?,?, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;