import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest } from 'src/interfaces/custom-request.interface';
dotenv.config();

const secretJwtKey = process.env.SECRET_JWT_KEY

export function logger(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, secretJwtKey, (err, jwtPayload) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (!jwtPayload) {
      return res.sendStatus(500)
    }

    req.jwtPayload = jwtPayload;
    next();
  });
};