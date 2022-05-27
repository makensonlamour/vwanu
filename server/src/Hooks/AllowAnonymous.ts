// eslint-disable-next-line no-unused-vars
export default function (options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { params } = context;

    if (params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'anonymous',
        },
      };
    }

    return context;
  };
}
