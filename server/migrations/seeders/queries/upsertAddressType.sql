INSERT INTO "AddressTypes"
("id","description","createdAt","updatedAt")
VALUES (?, ?, current_timestamp, current_timestamp)
ON CONFLICT DO NOTHING RETURNING id;