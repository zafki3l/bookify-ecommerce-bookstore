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
import { FindOneRoleUseCase } from '../../../application/use-cases/find-one-role.use-case';
import { FindOneRoleResponse } from '../../../application/responses/find-one-role.response';
import { CreateRoleRequest } from '../../requests/create-role.request';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CreateRoleUseCase } from '../../../application/use-cases/create-role.use-case';

@Controller('roles')
export class RolesController {
  public constructor(
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  @Get()
  public async findAll(): Promise<FindRolesResponse[]> {
    const roles = await this.findRolesUseCase.execute();

    return roles;
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<FindOneRoleResponse | null> {
    const role = await this.findOneRoleUseCase.execute(id);

    return role;
  }

  @Post()
  async create(@Body() request: CreateRoleRequest) {
    try {
      await this.createRoleUseCase.execute(request);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {}
}
