import _ from 'lodash';
import { BadRequest } from '@feathersjs/errors';

export default async (options, identifyUser, ownId, meta) => {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;
  const allProps = [];

  const queries = _.omitBy(identifyUser, _.isNil);
 
  const checkQuery = async (query) => {
    try {
      const users = await usersService.find({query});

      const items = Array.isArray(users) ? users : users.data;
      const isNotUnique =
        items.length > 1 ||
        (items.length === 1 && items[0][usersServiceIdName] !== ownId);
      allProps.push(isNotUnique ? Object.keys(query)[0] : null);
    } catch (err) {
      throw new BadRequest(
        meta.noErrMsg ? null : 'checkUnique unexpected error.',
        { errors: { msg: err.message, $className: 'unexpected' } }
      );
    }
  };

  // Object.keys(queries).forEach(async (key) => {
  await checkQuery(queries);
  // });
  const errProps = allProps.filter((prop) => prop);

  if (errProps.length) {
    const errs = {};
    errProps.forEach((prop) => {
      errs[prop] = 'Already taken.';
    });

    throw new BadRequest(meta.noErrMsg ? null : 'Values already taken.', {
      errors: errs,
    });
  }

  return null;
};
