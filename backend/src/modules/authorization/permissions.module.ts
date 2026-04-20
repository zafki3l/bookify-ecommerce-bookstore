import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeOrm } from './infrastructure/entities/permission.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { PERMISSIONS_QUERY_REPOSITORY } from './domain/repositories/permissions/permissions-query.repository.interface';
import { TypeOrmPermissionsQueryRepository } from './infrastructure/repositories/permissions/typeorm-permissions-query.repository';
import { PERMISSION_COMMAND_REPOSITORY } from './domain/repositories/permissions/permissions-command.repository.interface';
import { TypeOrmPermissionsCommandRepository } from './infrastructure/repositories/permissions/typeorm-permissions-command.repository';
import { FindPermissionsHandler } from './application/queries/permissions/find-permissions.handler';
import { CreatePermissionHandler } from './application/commands/permissions/create-permission.handler';
import { PERMISSION_EXISTS_CHECKER } from './domain/services/permissions/permission-exists-checker.service';
import { PermissionExistsChecker } from './infrastructure/services/permissions/permission-exists-checker.service';
import { ResourcesModule } from './resources.module';
import { ActionsModule } from './actions.module';
import { FindOnePermissionHandler } from './application/queries/permissions/find-one-permission.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionTypeOrm]),
    SharedCacheModule,
    ResourcesModule,
    ActionsModule,
  ],
  providers: [
    CreatePermissionHandler,
    FindPermissionsHandler,
    FindOnePermissionHandler,
    {
      provide: PERMISSIONS_QUERY_REPOSITORY,
      useClass: TypeOrmPermissionsQueryRepository,
    },
    {
      provide: PERMISSION_COMMAND_REPOSITORY,
      useClass: TypeOrmPermissionsCommandRepository,
    },
    {
      provide: PERMISSION_EXISTS_CHECKER,
      useClass: PermissionExistsChecker,
    },
  ],
  exports: [
    PERMISSIONS_QUERY_REPOSITORY,
    PERMISSION_COMMAND_REPOSITORY,
    PERMISSION_EXISTS_CHECKER,
  ],
})
export class PermissionsModule {}
