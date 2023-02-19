INSERT INTO "Interests" 
("id","name","approved","accessible","createdAt","updatedAt")
  VALUES (?, ?, true,true, current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;