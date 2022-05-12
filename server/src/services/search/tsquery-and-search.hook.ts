import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';
import { QueryTypes } from 'sequelize';

export default (options: any) => async (ctx: HookContext) => {
  // prevent a developer from using this hook without a named column to search
  if (!options.searchColumn)
    throw new GeneralError(
      'TSVector hook cannot function without a searchColumn a parameter.'
    );

  // gets the shared sequelize client
  const sequelize = ctx.app.get('sequelizeClient');
  const { id } = ctx.result;

  // creates a list of all of the fields we want to search based on the inclusion of a "level" field in our Model.
  // ts_rank allows us to set importance on four levels: A > B > C > D.

  // const fieldList = Object.keys(options.model.tableAttributes).filter(
  //   (k) =>
  //     (options.model.tableAttributes as any)[k]?.level &&
  //     ['A', 'B', 'C', 'D'].includes((options.model.tableAttributes as any)[k].level)
  // );

  // Object.keys(options.model.tableAttributes).forEach((key) => {
  //   if (options.model.tableAttributes[key].level)
  //     console.log(options.model.tableAttributes[key].fieldName);
  // });

  const { tableAttributes } = options.model;
  const fieldList = Object.keys(tableAttributes).filter(
    (field) => tableAttributes[field].level !== undefined
  );

  // const fieldList = [];
  // Our query is an update statement that maps each appropriate field to a vector and then merges all the vectors for storage
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
