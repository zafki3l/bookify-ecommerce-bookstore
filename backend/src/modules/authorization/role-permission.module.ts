import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionTypeOrm } from './infrastructure/entities/role-permission.entity';
import { ROLE_PERMISSION_QUERY_REPOSITORY } from './domain/repositories/role-permission/role-permission-query.repository.interface';
import { TypeOrmRolePermissionQueryRepository } from './infrastructure/repositories/role-permission/typeorm-role-permission-query.repository';
import { FindRolePermissionHandler } from './application/queries/role-permission/find-role-permission.handler';
import { FindOneRolePermissionHandler } from './application/queries/role-permission/find-one-role-permission.handler';
import { CreateRolePermissionHandler } from './application/commands/role-permission/create-role-permission.handler';
import { ROLE_PERMISSION_COMMAND_REPOSITORY } from './domain/repositories/role-permission/role-permission-command.repository.interface';
import { TypeOrmRolePermissionCommandRepository } from './infrastructure/repositories/role-permission/typeorm-role-permission-command.repository';
import { DeleteRolePermissionHandler } from './application/commands/role-permission/delete-role-permission.handler';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { RolesModule } from './roles.module';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermissionTypeOrm]),
    SharedCacheModule,
    RolesModule,
    PermissionsModule,
  ],
  providers: [
    CreateRolePermissionHandler,
    DeleteRolePermissionHandler,
    FindRolePermissionHandler,
    FindOneRolePermissionHandler,
    {
      provide: ROLE_PERMISSION_QUERY_REPOSITORY,
      useClass: TypeOrmRolePermissionQueryRepository,
    },
    {
      provide: ROLE_PERMISSION_COMMAND_REPOSITORY,
      useClass: TypeOrmRolePermissionCommandRepository,
    },
  ],
  exports: [
    ROLE_PERMISSION_QUERY_REPOSITORY,
    ROLE_PERMISSION_COMMAND_REPOSITORY,
  ],
})
export class RolePermissionModule {}
