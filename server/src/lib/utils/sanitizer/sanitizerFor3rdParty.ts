import { UserInterface } from '../../../schema/user';

export default function (user: UserInterface): Partial<UserInterface> {
  const u = user;
  delete u.password;
  return u;
}
