export default class AppError extends Error {
  status: number
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
    console.log('for testing properties only')
    console.log('for testing properties only')
    console.log('for testing properties only')
    console.log('for testing properties only')
    console.log('for testing properties only')
  }
}
