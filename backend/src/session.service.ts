import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Dog, Prisma } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async login(body: loginRequest): Promise<string> {
    return "yo"
  }
}