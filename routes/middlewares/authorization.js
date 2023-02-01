import jwt from 'jsonwebtoken';
import { statusCode } from '../../config/index.js';

export const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  const bearer = headerToken.split(' ');
  const token = bearer[1];
  try {
    if (token === 'null') {
      return req.status(statusCode.FORBIDDEN).json({ error: '토큰 없음' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, authorized) => {
      if (err) {
        return res.status(statusCode.FORBIDDEN).json({ error: '토큰 오류' });
      } else {
        req.authorizedUser = authorized;
      }
    });
    next();
  } catch (err) {
    next(err);
  }
};
