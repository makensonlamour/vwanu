import { HookContext } from '@feathersjs/feathers';

const AdjustReadAndReceivedDate = async (context: HookContext) => {
  const { data, app, id } = context;

  if (data.received) {
    context.data.received = true;
    context.data.receivedDate = Date.now();
  }
  if (data.read) {
    const { Message } = app.get('sequelizeClient').models;
    const message = await Message.findByPk(id);
    context.data.readDate = Date.now();
    if (!message.received) context.data.received = true;
    if (!message.receivedDate) context.data.receivedDate = Date.now();
  }

  return context;
};

export default AdjustReadAndReceivedDate;
