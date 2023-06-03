INSERT INTO "Interests" 
("id","name","approved","accessible","createdAt","updatedAt")
  VALUES (?, ?, true,true, current_timestamp, current_timestamp)
  ON CONFLICT("name") DO NOTHING RETURNING id;