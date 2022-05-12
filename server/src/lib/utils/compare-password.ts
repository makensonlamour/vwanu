import bcrypt from 'bcryptjs';

export default function comparePasswords(oldPassword, password, getError) {
  return new Promise<void>((resolve, reject) => {
    bcrypt.compare(oldPassword, password, (err, data1) =>
      err || !data1 ? reject(getError() || err) : resolve()
    );
  });
}
