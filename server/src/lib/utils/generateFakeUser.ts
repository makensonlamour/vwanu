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

const genders = ['m', 'f'];
export const getRandUser = (): FakeUser => {
  const rand = Math.floor(Math.random() * allUsers.length);
  const user = allUsers[rand];
  const userGender =
    user.gender === 'm' || user.gender === 'f'
      ? user.gender
      : genders[Math.floor(Math.random() * genders.length)];
  return {
    ...user,
    passwordConfirmation: user.password,
    email: generateFakeEmail(),
    gender: userGender,
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
