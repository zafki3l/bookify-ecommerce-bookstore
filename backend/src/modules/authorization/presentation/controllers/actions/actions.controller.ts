import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('actions')
export class ActionsController {
  @Get()
  findAll() {
    return 'Actions';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Action ${id}`;
  }

  @Post()
  create() {}
}
