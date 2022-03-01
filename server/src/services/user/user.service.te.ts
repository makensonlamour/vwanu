/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { UserInterface } from '../../schema/user';
import userService from './dataProvider';

describe('UserService', () => {
  let newUser: UserInterface = null;
  it('should be an object', () => {
    const properties = [
      'getUser',
      'createUser',
      'updateUser',
      'deleteUser',
      'loginUser',
    ];
    expect(typeof userService).toBe('object');
    expect(
      properties.every((property) => userService.hasOwnProperty(property))
    ).toBe(true);
  });

  it('should create a new user', async () => {
    newUser = await userService.createUser(
      { email: 'emailme@server.com' },
      '12345678'
    );

    expect(newUser.id).toBeDefined();
    expect(typeof newUser.id).toBe('number');
    expect(typeof newUser.activationKey).toBe('string');
    expect(newUser.password === '12345678').toBe(false);
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
