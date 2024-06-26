import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { UserService } from './user.service';
import { DogService } from './dog.service';
import { PrismaService } from './prisma.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionService } from './session.service';
import { logger } from './middleware/logger.middleware';
import { GetewayModule } from './gateway/gateway.module';

@Module({
  imports: [GetewayModule],
  controllers: [AppController, DogsController, SessionsController],
  providers: [AppService, UserService, DogService, PrismaService, SessionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes('user');
  }
}
