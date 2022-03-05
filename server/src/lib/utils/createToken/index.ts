import jwt, { SignCallback } from 'jsonwebtoken';
import config from 'config';

const JWT_SECRET = config.get<string>('JWT_SECRET');

export default function (user: any, cb: SignCallback) {
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, cb);
}
