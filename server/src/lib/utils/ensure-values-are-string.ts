const { BadRequest } = require('@feathersjs/errors');

export default function ensureValuesAreStrings(...rest) {
  if (!rest.every((str) => typeof str === 'string')) {
    throw new BadRequest('Expected string value.');
  }
}
