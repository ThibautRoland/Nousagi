import { Controller, Get,
  Param,
  Post,
  Body,
  Put,
  Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { DogService } from './dog.service';
import { User as UserModel, Dog as DogModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly DogService: DogService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/yo')
  getYo(): string {
    return 'yo';
  }

  
  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
