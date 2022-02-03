import express from 'express'
import CommonRoutesConfig from '..'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }
  configureRoutes() {
    this.app
      .route(`/users`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of users`)
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to users`)
      })
    return this.app
  }
}
