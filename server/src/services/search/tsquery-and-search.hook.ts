import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';
import { QueryTypes } from 'sequelize';

export default (options: any) => async (ctx: HookContext) => {
  // Postgres is not used in testing mode therefore the functions are not available
  if (process.env.NODE_ENV === 'test') return ctx;

  if (!options.searchColumn)
    throw new GeneralError(
      'TSVector hook cannot function without a searchColumn a parameter.'
    );

  const sequelize = ctx.app.get('sequelizeClient');
  const { id } = ctx.result;

  const { tableAttributes } = options.model;
  const fieldList = Object.keys(tableAttributes).filter(
    (field) => tableAttributes[field].level !== undefined
  );

  const setLevel = fieldList
    .map(
      (field, idx) =>
        `setweight(to_tsvector($${idx + 1}), '${tableAttributes[field].level}')`
    )
    .join('||');

  const query = `
    UPDATE "${options.model.tableName}" SET "${options.searchColumn}" = (${setLevel})WHERE "id"=${id} RETURNING ${options.searchColumn};`;

  // we now await the query update and do a SQL-safe injection through the bind option in sequelize.  This replaces the $1 and $2 etc. in the UPDATE statement with the values from our input data.
  await sequelize
    .query(query, {
      bind: fieldList.map((v) => ctx.result[v]),
      type: QueryTypes.UPDATE,
    })
    .then((r: any) => {
      // because we want see the vector in our result(not normal), we modify the outbound data by appending the updated search_vector field.
      // set the result to the context object so we can share it with the user or hide it
      ctx.result[options.searchColumn] = r[0][0][options.searchColumn];
    })
    // since the data has already been mutated/deleted, we shouldn't throw an error to the end user, but log it for internal tracking
    .catch((e: any) => console.error(e));

  return ctx;
};
