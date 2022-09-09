export default (context) => {
  const { query = {}, User } = context.params;

  if (!query.response) {
    query.response = null;
  }
  if (!query.UserId) {
    query.UserId = User.id;
  }
  context.params.query = query;

  return context;
};
