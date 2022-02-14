import config from 'config'
import Log from './logger'
import nodemailer, { SendMailOptions } from 'nodemailer'

const smtp = config.get<{
  user: string
  pass: string
  host: string
  port: number
  secure: boolean
}>('smtp')

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
})

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      Log.error('Error sending email')
      return
    }

    Log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
}

export default sendEmail
