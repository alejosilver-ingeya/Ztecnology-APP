import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERR_UNAUTHORIZED } from '../routes/auth.routes';

interface RequestWithUser extends Request {
  user?: DecodedUser; 
}

interface DecodedUser {
  email: string;
  id: number;
}

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: ERR_UNAUTHORIZED });
  }

  try {
    const decoded = jwt.verify(token, "auth_key_custom_secret") as DecodedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: ERR_UNAUTHORIZED });
  }
};

export default verifyToken;
