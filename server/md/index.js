import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connect_to_DB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://wadson:Poupouy12@cluster0.kgjhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )

    console.log('Database connected successfully ')
  } catch (error) {
    console.error(`Database connection failed ${error.message}`)
    process.exit(1)
  }
}
async function fn() {
  console.log('s------4-4-4-4-4-4-4')
  await connect_to_DB()
  console.log('e')
}
//fn()
const userSchema = new mongoose.Schema({
  text: {
    type: String,
  },
})
const user = mongoose.model('user', userSchema)
const u = new user({ text: 'test' })
await u.save()
console.log(u)
Object.keys(u).forEach((key) => {
  if (typeof u[key] === 'object') {
    console.log(`key : ${key}, val :${Object.keys(u[key])}`)
    console.log('_____')
  }
})
