import { Op } from '@sequelize/core';
import { Sequelize } from 'sequelize';
import queryConverter from 'pg-tsquery';
import { HookContext } from '@feathersjs/feathers';

// Todo  Make search people not in a community ,
import userQuery, { queryClause } from '../../lib/utils/userQuery';

export default (defaultOptions: any) => async (ctx: HookContext) => {
  const options = {
    conversionOptions: {},
    searchColumn: 'search_vector',
    ...defaultOptions,
  };
  const { params, path } = ctx;

  const search = params?.query?.$search;

  if (!search) return ctx;
  delete ctx.params?.query?.$search;

  const { filters, query: where } = ctx.app.service(path).filterQuery(params);

  let clause = {
    ...where,
    [Op.and]: Sequelize.fn(
      `${options.searchColumn} @@ to_tsquery`,
      Sequelize.literal(':query')
    ),
  };

  let attributes = null;
  if (path === 'search') {
    clause = queryClause(ctx, where);
    attributes = userQuery(params.User.id, Sequelize);
    // console.log('clause0', clause);
    if (Array.isArray(clause[Op.and])) {
      clause[Op.and].push(
        Sequelize.fn(
          `${options.searchColumn} @@ to_tsquery`,
          Sequelize.literal(':query')
        )
      );
    } else {
      clause = {
        ...clause,
        [Op.and]: [
          Sequelize.fn(
            `${options.searchColumn} @@ to_tsquery`,
            Sequelize.literal(':query')
          ),
        ],
      };
    }
    // console.log('clause1', clause[Op.and]);
  }
  params.sequelize = {
    // logging: console.log,
    where: clause,
    replacements: { query: queryConverter(options.conversionOptions)(search) },
  };

  const selected = filters.$select;

  if ((selected && selected.includes('rank')) || !selected) {
    delete ctx.params?.query?.$select;
    // then re-add it as a Sequelize column
    const rankFunc = [
      Sequelize.fn(
        `ts_rank(${options.searchColumn}, to_tsquery`,
        Sequelize.literal(':query)')
      ),
      'rank',
    ];

    params.sequelize.attributes =
      ctx.path === 'search'
        ? attributes
        : {
            include: [rankFunc],
          };
    // ? // if there are selected fields in the query, use the array structure and add our rank column,
    //   [...selected.filter((col: string) => col !== 'rank'), rankFunc]
    // : // if there are no selected fields, use the object structure that defaults to include all and then add our rank column
    // {
    //   include: [rankFunc];
    // }
  }
  // if (!filters.$sort) {
  // params.sequelize.order = [Sequelize.literal('rank DESC')];
  // } else {
  // const order = utils.getOrder(filters.$sort);
  // params.sequelize.order = order.map((col: string) => {
  // if (col[0] === 'rank') {
  // return [Sequelize.literal(`rank ${col[1]}`)];
  // }
  // return col;
  // });
  // }

  return ctx;
};
