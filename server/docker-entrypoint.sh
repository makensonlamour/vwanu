echo "Waiting for the database to be ready..."

./wait-for pg_db:5432 
echo "Database is up"

echo "Migrating database"
npm run migrate

echo "Seeding database"
npm run seed

echo "Starting server"
npm run start
 