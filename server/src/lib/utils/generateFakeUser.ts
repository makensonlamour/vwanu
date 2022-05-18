/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { nanoid } from 'nanoid';

/** Local dependencies */
import allUsers from './fakeUser';

const NAMESPACE = config.get('TEST_MAIL_NAMESPACE');

export type FakeUser = {
  id: number | string;
  email: string;
  gender: string;
  ip_address: string;
  password: string;
  passwordConfirmation: string;
  deviceId: string;
};

export const generateFakeEmail = () =>
  `${NAMESPACE}.${nanoid()}@inbox.testmail.app`;

export const getRandUser = (): FakeUser => {
  const rand = Math.floor(Math.random() * allUsers.length);
  const user = allUsers[rand];
  return {
    ...user,
    passwordConfirmation: user.password,
    email: generateFakeEmail(),
  };
};

export const getRandUsers = (numberOfUser = 1): FakeUser[] => {
  const users: any[] = [];
  let i = 0;
  while (i < numberOfUser) {
    users.push(getRandUser());
    i += 1;
  }
  return users;
};
