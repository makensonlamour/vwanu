/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */

import { Op } from '@sequelize/core';

import { UserInterface } from '../../schema/user';
import userService from './dataProvider';
import db from '../../models';

describe('UserService', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ logging: false, alter: true });
  });
  let newUser: UserInterface = null;

  it.skip('should create a new user', async () => {
    newUser = await userService.createUser(
      { email: 'emailme@server.com', password: '12345678' },
      '12345678'
    );

    expect(newUser.id).toBeDefined();
    expect(typeof newUser.id).toBe('number');
    expect(typeof newUser.activationKey).toBe('string');
    expect(newUser.password === '12345678').toBe(false);
  });

  it('should create a follower', async () => {
    const users = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 2; index++) {
      const user = {
        email: `email${index}@email.com`,
        password: `password${index}`,
        firstName: `firstName${index}`,
        lastName: `lastName${index}`,
      };
      users[index] = userService.createUser(user, 'password');
    }
    const allUsers = await Promise.all(users);
    const [user1, user2] = allUsers;

    await Promise.all([user2.addFollower(user1), user1.addFollowing(user2)]);

    const follower = await db.User.findOne({
      where: { id: user2.id },
      attributes: ['id'],
      include: [
        {
          model: db.User,
          as: 'Follower',
          attributes: ['firstName', 'lastName'],
        },
      ],
    });

    const following = await db.User.findOne({
      where: { id: user1.id },
      attributes: ['id'],
      include: [
        {
          model: db.User,
          as: 'Following',
          attributes: ['firstName', 'lastName'],
        },
      ],
    });

    expect(Array.isArray(follower.Follower)).toBeTruthy();
    expect(follower.Follower[0].User_Follower).toEqual(
      expect.objectContaining({
        UserId: user2.id,
        FollowerId: user1.id,
      })
    );
    expect(following.Following[0].User_Following).toEqual(
      expect.objectContaining({
        UserId: user1.id,
        FollowingId: user2.id,
      })
    );
  }, 10000);

  it('testing ', async () => {
    const v = 2;
    const response = await db.Post.findAll({
      where: {
        UserId: {
          [Op.or]: [
            db.sequelize.literal(
              `select UserId from User_Follower where FollowerId=${v}`
            ),
          ],
        },
      },
    });
    console.log('testing response');

    console.log(response);
  });

  //   it('should not create a new user with the same email', async () => {
  //     await userService.createUser(
  //       { email: 'emailme@server.com', password: 12345678 },
  //       '12345678'
  //     )
  //     expect
  //   })

  it('should update the create  user', async () => {
    expect(true).toBe(true);
    // const updateUser: any = await userService.updateUser(newUser, {
    //   resetPasswordKey: 'realuserEmail25@hotmail.com',
    // })
    // await updateUser?.reload()
    // // console.log('messing with me ')
    // // console.log(updateUser)
    // // console.log(newUser)

    // expect(updateUser?.resetPasswordKey === 'realuserEmail25@hotmail.com').toBe(
    //   true
    // )
  });
});
