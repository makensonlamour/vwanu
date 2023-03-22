  INSERT INTO "EmailTemplates" 
  ("subject", "body","snug", "createdAt", "updatedAt" )
  VALUES (?, ?, ?, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;