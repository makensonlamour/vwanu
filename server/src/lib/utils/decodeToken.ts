import config from 'config';
import jwt from 'jsonwebtoken';

export default (token: string) => {
  const JWT_SECRET = config.get<string>('JWT_SECRET');
  jwt.verify(token, JWT_SECRET as jwt.Secret, (err, decoded) => {
    if (err && !decoded) throw new Error(err.message);
    return decoded;
  });
};
