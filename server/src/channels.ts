/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function (app: Application): void {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any): void => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: any, { connection }: any): void => {
    console.log('\n\n\n login triggered');

    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      app.channel('anonymous').leave(connection);
      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      // Joining all chat rooms for updates of new messages

      const { User } = connection;

      app
        .service('conversation')
        .find({
          query: {},
          paginate: false,
          User,
        })
        .then((conversationUsers: any) => {
          conversationUsers.forEach((conversationUser: any) => {
            app
              .channel(`conversation-${conversationUser.ConversationId}`)
              .join(connection);
          });
        });

      app
        .channel(`emails/${User.email}`, `userIds/${User.id}`)
        .join(connection);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.publish((data: any, hook: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.ts`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // se.log('Publishing all events to all authenticated users. See `channels.ts` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}
