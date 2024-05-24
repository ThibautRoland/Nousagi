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
}
