import mongoose from 'mongoose'
const connect_to_DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('Database connected successfully ')
  } catch (error) {
    console.error(`Database connection failed ${error.message}`)
    process.exit(1)
  }
}

export default connect_to_DB
