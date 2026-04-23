import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne(@Param('id') id: string) {}

  @Post()
  async create(@Body() dto: any) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {}
}
