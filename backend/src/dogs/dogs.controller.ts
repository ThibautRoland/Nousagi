import { Controller, Get, Param } from '@nestjs/common';

@Controller('dogs')
export class DogsController {

    @Get('/all')
    findAll(): string {
        return "findAll"
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        return `find the dog with id ${params.id}`
    }
}
