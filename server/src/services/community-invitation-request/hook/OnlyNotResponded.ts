export default (context) => {
  const { query = {} } = context.params;

  if (!query.response) {
    query.response = null;
  }
  context.params.query = query;

  return context;
};
