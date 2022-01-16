export default function (req, res, next) {
  if ('production' === process.env.NODE_ENV) return
  console.log({ body: req.body })
  return next()
}
