import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from 'src/session.service';

@Controller('sessions')
export class SessionsController {
    constructor(
        // private readonly appService: AppService,
        private readonly sessionService: SessionService,
      ) {}

    @Post('login')
    async login(
        @Body() userData: {
            email: string,
            password: string
        }
    ): Promise<userAuth> {
        try {
            const userAuth = { token: "yo", id: -1}
            return userAuth
        } catch (error) {
            return error
        }
    } 
}
