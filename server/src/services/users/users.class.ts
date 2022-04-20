/* eslint-disable no-unused-vars */
import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class Users extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: Partial<any> | Partial<any>[], params?: Params): Promise<any> {
    console.log(data);
   return  super.create(data, params);
  }
}
