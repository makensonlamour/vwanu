const logger = () => (next) => (action) => {
  //console.log({ store, next, action })
  next(action);
};
export default logger;
