import { Body, Controller, Post, Res } from '@nestjs/common';
import { SessionService } from 'src/session.service';
import { Response } from 'express';

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
        },
        @Res() res: Response
    ): Promise<userAuth | object> {
        try {
            const userAuth = await this.sessionService.login(userData)
            if (!userAuth) {
                return res.status(404).json({message: "user not found"})
            }
            return res.status(200).json(userAuth)
        } catch (error) {
            return error
        }
    } 
}
