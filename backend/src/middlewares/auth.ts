import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
     id?: string;
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
     try {
          const authorization = req.headers.authorization;
          const token = authorization?.split(' ')[1];
          if (!token) {
               res.status(404).json({ success: false, message: 'No token found' });
               return;
          }
          jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
               if (err) {
                    res.status(400).json({ success: false, message: 'Invalid token' });
                    return;
               }
               const user = decoded as JwtPayload;
               if (user && user.id) {
                    req.id = user.id;
                    next();
               } else {
                    res.status(400).json({ success: false, message: 'Invalid token payload'});
                    return;
               }
          });
     } catch (error) {
          console.error("❌ Error during authentication: ", error)
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}