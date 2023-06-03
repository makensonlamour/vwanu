INSERT INTO "ForumCategories"
("id","name","description","coverPicture","createdAt","updatedAt")
   VALUES (?, ?, ?,?, current_timestamp, current_timestamp)
  ON CONFLICT("name") DO NOTHING;
