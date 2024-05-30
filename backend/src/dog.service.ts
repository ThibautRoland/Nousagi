import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Dog, Prisma } from '@prisma/client';

@Injectable()
export class DogService {
  constructor(private prisma: PrismaService) {}

  async dog(
    postWhereUniqueInput: Prisma.DogWhereUniqueInput,
  ): Promise<DogWithMaster | null> {
    return this.prisma.dog.findUnique({
      include: {
        master: true
      },
      where: postWhereUniqueInput,
    });
  }

  async dogs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DogWhereUniqueInput;
    where?: Prisma.DogWhereInput;
    orderBy?: Prisma.DogOrderByWithRelationInput;
  }): Promise<DogWithMaster[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.dog.findMany({
      include: {
        master: true
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDog(data: Prisma.DogCreateInput): Promise<DogWithMaster> {
    return this.prisma.dog.create({
      include: {
        master: true
      },
      data,
    });
  }

  async updateDog(params: {
    where: Prisma.DogWhereUniqueInput;
    data: Prisma.DogUpdateInput;
  }): Promise<DogWithMaster> {
    const { data, where } = params;
    return this.prisma.dog.update({
      include: {
        master: true
      },
      data,
      where,
    });
  }

  async deleteDog(where: Prisma.DogWhereUniqueInput): Promise<Dog> {
    return this.prisma.dog.delete({
      where,
    });
  }

  async getDogsWithMasters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DogWhereUniqueInput;
    where?: Prisma.DogWhereInput;
    orderBy?: Prisma.DogOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.dog.findMany({
      include: {
        master: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}