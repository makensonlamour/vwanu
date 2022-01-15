import Test from '../../models/test.js'

export const getAll = async (req, res, next) => {
  try {
    const all = await Test.findAll()
    return res.status(200).json(all)
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export const createOne = async (req, res, next) => {
  const test = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  try {
    const newTest = await Test.create(test)
    return res.status(201).json(newTest)
  } catch (error) {
    return res.status(500).json(error)
  }
}
