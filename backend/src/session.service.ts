import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Dog, Prisma } from '@prisma/client';
import { UserService } from './user.service';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const password_key = process.env.PASSWORD_SECRET_KEY
const secretJwtKey = process.env.SECRET_JWT_KEY

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async login(body: loginRequest): Promise<null | userAuth> {

    try {
        const user = await this.userService.user({email: body.email})
        if (!user) {
            return null
        }
        const dbPassword = await this.decryptPassword(user.password)
        if (body.password !== dbPassword) {
            return null
        }
        const token = this.generateJwtToken(body.email, user.id);
        const userAuth = {
            token: token,
            id: user.id
        }
    
        return userAuth;

    } catch(error) {
        return error;
    }
  }

  async decryptPassword(encryptedPassword: string): Promise<string> {
    // Convert Base64 string back to bytes
    const encryptedPasswordBytes = Buffer.from(encryptedPassword, 'base64');
  
    // Decrypt the password using pgp_sym_decrypt
    const decryptedPasswordResult = await this.prisma.$queryRaw`SELECT pgp_sym_decrypt(${encryptedPasswordBytes}, ${password_key}) AS decrypted`;
    const decryptedPassword = decryptedPasswordResult[0].decrypted;
  
    return decryptedPassword;
  }

  generateJwtToken(email: string, id: number) {
    return jwt.sign({email, id}, secretJwtKey, { expiresIn: '1800s' })
  }
}