const mongooseValidation = (err, req,res,next) => {
  console.log(err.message)
  next()
}

module.exports = mongooseValidation
