import Logger from "../lib/utils/logger"
export default class AppError extends Error {
  status: number
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
    Logger.error({message, status})
  }
}
