// Initializes the `call ` service on path `/call`
/* eslint-disable no-unused-vars */
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Call } from './call.class';
import hooks from './call.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    call: Call & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Call,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/call', new Call(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('call');
  service.publish('created', (call, context) =>
    app.channel(`userIds-${call.receiverId}`)
  );
  service.publish('patched', (call, context) => {
    switch (call.status) {
      case 'denied':
      case 'answered':
        // console.log('received');
        return app.channel(`userIds-${call.callerId}`);
      // return [
      //   app.channel(`userIds-${call.receiverId}`),
      //   app.channel(`userIds-${call.callerId}`),
      // ];
      case 'ended':
        return context.params.User.id === call.callerId
          ? app.channel(`userIds-${call.receiverId}`)
          : app.channel(`userIds-${call.callerId}`);
      default:
        console.error('Unknown call status', call.status);
        return null;
      // return [
      //   app.channel(`userIds-${call.receiverId}`),
      //   app.channel(`userIds-${call.callerId}`),
      // ];
    }
  });

  // service.publish((call: any, context: any) => app.channel('api'));

  service.hooks(hooks);
}
