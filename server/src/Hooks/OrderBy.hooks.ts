import isNil from 'lodash/isNil';

export default (options) => (context) => {
  if (isNil(options)) throw new Error('options is required');
  const { query = {} } = context.params;

  if (!query.$sort) {
    query.$sort = options;
  }
  context.params.query = query;

  return context;
};
