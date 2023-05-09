const fs = require('fs')
const path = require('path')
const environment = 'STAGING'
const fileToWritePath = path.resolve(__dirname, `./.env.${environment}`)
const readEnv = () => {
  // Read the .env file line by line
  const envFile = fs.readFileSync(path.resolve(__dirname, './.env'), 'utf8')

  // fs.deleteSync(fileToWritePath)

  // Split the file into an array of lines
  envFile
    .split('\n')
    .filter((line) => line.length > 0)
    .forEach((line) => {
      const [key, value] = line.split('=')

      // Rewrite to a new .env file
      const lineValue = `${environment}_${key}=${value}\n`
      fs.writeFileSync(fileToWritePath, lineValue, {
        flag: 'a',
      })
      // console.log(`echo "${key}=\${{secrets.STAGING_${key}}}" >>  .env`)
    })
}

function timeConversion(s) {
  // Write your code here
  let [hour, min, secPeriod] = s.split(':')
  let ch = parseInt(hour)
  if (!secPeriod.includes('AM')) ch = parseInt(hour) + 12
  if (parseInt(hour) == 12)
    if (secPeriod.includes('AM')) ch = 0
    else ch = 12

  // converting time
  ch = ch > 9 ? ch : `0${ch}`

  return `${ch}:${min}:${secPeriod.slice(0, 2)}`
}
// console.log(timeConversion('2:34:56PM'))
console.log(timeConversion('12:45:54PM'))
// readEnv()
