/* eslint-disable no-unused-vars */
import { Sequelize } from 'sequelize';
import { BadRequest } from '@feathersjs/errors';
import { HookContext, Id } from '@feathersjs/feathers';

// const queryClause = (context: HookContext, where: any) => {}
// const loanQuery = (employeeId: number, context: HookContext) => {}

export default (
    queryClause: (context: HookContext, where: any) => any,
    specificQuery: (id: Id, seq: Sequelize, excludes: string[]) => any
  ) =>
  (context: HookContext) => {
    const { app, params } = context;
    const UserId = params.User.id;
    const service = context.app.service(context.path);
    if (!UserId) {
      throw new BadRequest(
        `You must be logged in to take action on ${service.name}}`
      );
    }

    const sequelize = app.get('sequelizeClient');
    const attributes = specificQuery(UserId, sequelize, []);

    const { query: where } = service.filterQuery(context.params);
    if (context.method === 'get') where.id = context.id;
    const clause = queryClause(context, where);

    params.sequelize = {
      // logging: console.log,
      where: clause,
      attributes,
    };
    return context;
  };
