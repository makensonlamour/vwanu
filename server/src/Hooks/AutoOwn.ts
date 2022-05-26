export default function (context) {
  context.data.UserId = context.params.User.id;
  return context;
}
