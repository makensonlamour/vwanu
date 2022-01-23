import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true',
    },
  }
)

export async function connectDb() {
  await sequelize.sync({ force: false })
}

export default { sequelize, connectDb }
