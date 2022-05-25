import bcrypt from 'bcryptjs';

// eslint-disable-next-line no-unused-vars
export default async function hashPassword(app, password, field) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}
