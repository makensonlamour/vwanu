// /* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
// import { BadRequest } from '@feathersjs/errors';

export default async (context: HookContext): Promise<HookContext> => context;

// const areThereOtherAdmins = async (app, adminRoleId)=> {
//     const otherAdmins = await app.service('community-users')._get(null, {
//       query: {
//         UserId: { $not: User.id },
//         CommunityId: context.id,
//         CommunityRoleId: adminRole.id,
//       },
//     });
//     if (!otherAdmins) throw new BadRequest('There must be at least one admin');
//     return context;
// }
// export default async (context: HookContext): Promise<HookContext> => {
//   const { app, params, method } = context;
//   const { User } = params;

//   const entity = await app.service('community-users')._get(context.id);
//   if (!entity) throw new BadRequest('Community user not found');
//   let roles = await app.service('community-role ')._find();
//   if (!roles) throw new BadRequest('Community roles not found');
//   roles = roles.map((role) => ({ id: role.id, name: role.name }));
//   const memberRole = roles.find((role) => role.name === 'member');
//   const adminRole = roles.find((role) => role.name === 'admin');
//   const moderatorRole = roles.find((role) => role.name === 'moderator');

//   switch(method) {

//     case 'remove':
//         if((entity.CommunityRoleId === memberRole.id ||
//       entity.CommunityRoleId === moderatorRole.id) &&
//     entity.UserId !== User.id) return context;

//     const myRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: User.id,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });

//     const userRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: entity.UserId,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });

//     if (
//       (myRole.CommunityRoleId === moderatorRole.id ||
//         myRole.CommunityRoleId === memberRole.id) &&
//       (userRole.CommunityRoleId === adminRole.id ||
//         userRole.CommunityRoleId === moderatorRole.id)
//     ) {
//       throw new BadRequest('You are not allowed to Remove this user');
//     }

//     case 'patch':

//     const myRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: User.id,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });

//     const userRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: entity.UserId,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });

//     if (
//       (myRole.CommunityRoleId === moderatorRole.id ||
//         myRole.CommunityRoleId === memberRole.id) &&
//       (userRole.CommunityRoleId === adminRole.id ||
//         userRole.CommunityRoleId === moderatorRole.id)
//     ) {
//       throw new BadRequest('You are not allowed to change  this user role');
//     }
//     }

//   }
//   if (method === 'remove')

//     { &&

//   }

//   if ((method = 'patch')) {
//     const myRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: User.id,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });

//     const userRole = await app.service('community-users')._get(null, {
//       query: {
//         UserId: entity.UserId,
//         CommunityId: context.id,
//         $select: ['CommunityRoleId'],
//       },
//     });
//     if (
//       (myRole.CommunityRoleId === moderatorRole.id ||
//         myRole.CommunityRoleId === memberRole.id) &&
//       (userRole.CommunityRoleId === adminRole.id ||
//         userRole.CommunityRoleId === moderatorRole.id)
//     ) {
//       throw new BadRequest('You are not allowed to change this user role');
//     }
//   }

//   return context;
// };
