const { BadRequest } = require('@feathersjs/errors');

export default function ensureObjPropsValid(obj, props, allowNone = false) {
  const keys = Object.keys(obj);
  const valid = keys.every(
    (key) => props.includes(key) && typeof obj[key] === 'string'
  );

  if (!valid || (keys.length === 0 && !allowNone)) {
    throw new BadRequest('User info is not valid. (authLocalMgnt)');
  }
}
