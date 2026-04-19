import { Controller, Get, Param } from '@nestjs/common';

@Controller('actions')
export class ActionsController {
  @Get()
  findAll() {
    return 'Actions';
  }

  @Get()
  find(@Param('id') id: string) {
    return `Action ${id}`;
  }
}
