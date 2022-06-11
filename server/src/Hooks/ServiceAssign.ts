import { HookContext } from '@feathersjs/feathers';

export type Options = { name: string };

export default (options: Options) => async (context: HookContext) => {
  if (!options.name) throw new Error('Please provide a service name');
  const { app } = context;
  const serviceModel = app.get('sequelizeClient').models.Service;
  const [{ id: serviceId }] = await serviceModel.findOrCreate({
    where: { name: options.name },
  });
  context.data.ServiceId = serviceId;

  return context;
};
