import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindPermissionsUseCase } from '../../application/permission-use-cases/find-permissions/find-permissions.use-case';
import { FindPermissionsResponse } from '../../application/permission-use-cases/find-permissions/find-permissions.response';
import { FindOnePermissionUseCase } from '../../application/permission-use-cases/find-one-permission/find-one-permission.use-case';
import { CreatePermissionRequest } from './requests/create-permission.request';
import ExceptionHandler from '../../../../shared/exception/exception.handler';
import { CreatePermissionUseCase } from '../../application/permission-use-cases/create-permission/create-permission.use-case';

@Controller('permissions')
export class PermissionsController {
  public constructor(
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
    private readonly findOnePermissionUseCase: FindOnePermissionUseCase,
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  @Get()
  public async findAll(): Promise<FindPermissionsResponse[]> {
    const permissions = await this.findPermissionsUseCase.execute();

    return permissions;
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<FindPermissionsResponse | null> {
    const permission = await this.findOnePermissionUseCase.execute(id);

    return permission;
  }

  @Post()
  public async create(@Body() request: CreatePermissionRequest) {
    try {
      await this.createPermissionUseCase.execute(request);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
