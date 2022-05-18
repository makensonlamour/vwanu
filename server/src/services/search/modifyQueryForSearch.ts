import { Op } from '@sequelize/core';
import { Sequelize } from 'sequelize';
import queryConverter from 'pg-tsquery';
import { HookContext } from '@feathersjs/feathers';
import utils from 'feathers-sequelize/lib/utils.js';

export default (defaultOptions: any) => async (ctx: HookContext) => {
  const options = {
    conversionOptions: {},
    searchColumn: 'search_vector',
    ...defaultOptions,
  };
  const { params } = ctx;

  const search = params?.query?.$search;

  if (!search) return ctx;
  delete ctx.params?.query?.$search;

  const { filters, query: where } = ctx.app
    .service(ctx.path)
    .filterQuery(params);

  params.sequelize = {
    where: {
      ...where,
      [Op.and]: Sequelize.fn(
        `${options.searchColumn} @@ to_tsquery`,
        Sequelize.literal(':query')
      ),
    },
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

    params.sequelize.attributes = selected
      ? // if there are selected fields in the query, use the array structure and add our rank column,
        [...selected.filter((col: string) => col !== 'rank'), rankFunc]
      : // if there are no selected fields, use the object structure that defaults to include all and then add our rank column
        { include: [rankFunc] };
  }
  if (!filters.$sort) {
    params.sequelize.order = [Sequelize.literal('rank DESC')];
  } else {
    const order = utils.getOrder(filters.$sort);
    params.sequelize.order = order.map((col: string) => {
      if (col[0] === 'rank') {
        return [Sequelize.literal(`rank ${col[1]}`)];
      }
      return col;
    });
  }

  return ctx;
};
