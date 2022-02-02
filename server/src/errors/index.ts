export default class AppError extends Error {
  status: number
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
    console.error('no error but be stupid')
  }
}
