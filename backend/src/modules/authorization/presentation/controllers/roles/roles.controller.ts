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
import { FindRolesUseCase } from '../../../application/use-cases/find-roles.use-case';
import { FindRolesResponse } from '../../../application/responses/find-roles.response';

@Controller('roles')
export class RolesController {
  constructor(private readonly findRolesUseCase: FindRolesUseCase) {}

  @Get()
  async findAll(): Promise<FindRolesResponse[]> {
    const roles = await this.findRolesUseCase.execute();

    return roles;
  }

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
