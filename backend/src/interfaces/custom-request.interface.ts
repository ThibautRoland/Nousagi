import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  jwtPayload?: string | jwt.JwtPayload;
//   customMethod?: () => string;
}