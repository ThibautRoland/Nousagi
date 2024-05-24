import { Controller, Get,
  Param,
  Post,
  Body,
  Put,
  Delete, 
  Req,
  HttpCode,
  Res,
  HttpStatus,
  Injectable,
  Patch} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { DogService } from './dog.service';
import { User as UserModel, Dog as DogModel } from '@prisma/client';
import { Request } from 'express';

@Injectable()
@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly dogService: DogService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/yo')
  getYo(): string {
    return 'yo';
  }

  @Get('/users')
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const users = await this.userService.users({})
      return users;
    } catch (error) {
      return error;
    }
  }

  @Get('/user/:id')
  async getUserById(@Param('id') id: String): Promise<UserModel> {
    return this.userService.user({id: Number(id)})
  }

  
  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: String): Promise<UserModel> {
    try {
      const deletedUser = await this.userService.deleteUser({id: Number(id)})
      return deletedUser
    } catch (error) {
      return error
    }
  }

  @Get('/dogs')
  async getAllDogs(): Promise<DogModel[]> {
    try {
      const dogs = await this.dogService.dogs({})
      return dogs;
    } catch (error) {
      return error;
    }
  }

  @Get('/dog/:id')
  async getOneDog(@Param('id') id: String): Promise<DogModel> {
    try {
      const dog = await this.dogService.dog({id: Number(id)})
      return dog;
    } catch (error) {
      return error
    }
  }

  @Post('dog')
  async createDog(
    @Body() dogData: { name?: string; race?: string; masterId?: number },
  ): Promise<DogModel> {
    try {
      const dog = this.dogService.createDog(dogData);
      return dog
    } catch (error) {
      return error
    }
  }

  @Patch('dog/:id')
  async updateDog(
    @Body() dogData: { name?: string; race?: string; masterId?: number },
    @Param('id') id: String
  ): Promise<DogModel> {
    try {
      const dog = this.dogService.updateDog({
        where: {id: Number(id)},
        data: dogData
      });
      return dog
    } catch (error) {
      return error
    }
  }
  
  @Delete('dog/:id')
  async deleteDog(
    @Param('id') id: Number
  ) : Promise<DogModel> {
    try {
      const dog = await this.dogService.deleteDog({id: Number(id)})
      return dog
    } catch (error) {
      return error
    }
  }
}
