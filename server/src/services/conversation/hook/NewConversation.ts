import { HookContext } from '@feathersjs/feathers';
import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const {
    app,
    data,
    result,
    params: { User },
  } = context;
  if (!data?.userIds || !app.channel(app.channels).length || !User)
    return context;

  try {
    const cons = [...data.userIds, User?.id]
      .map((userId) => {
        const { connections } = app
          .channel(app.channels)
          .filter((connection) => connection?.User?.id === userId);
        if (connections?.length) return connections[0];
        return null;
      })
      .filter((filter) => filter !== null);
    cons.forEach((connection) => {
      if (Array.isArray(connection)) {
        connection.forEach((connObject) => {
          app.channel(`conversation-${result.id}`).join(connObject);
        });
      }
      app.channel(`conversation-${result.id}`).join(connection);
    });
  } catch (error) {
    Logger.error(error);
  }

  return context;
};
