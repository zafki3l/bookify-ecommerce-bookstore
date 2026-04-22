import { Module } from '@nestjs/common';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { ActionsModule } from './actions.module';
import { ResourcesModule } from './resources.module';
import { PermissionsModule } from './permissions.module';
import { PermissionsController } from './presentation/controllers/permissions/permissions.controller';
import { RolesController } from './presentation/controllers/roles/roles.controller';
import { RolesModule } from './roles.module';
import { RolePermissionModule } from './role-permission.module';
import { RolePermissionController } from './presentation/controllers/role-permission/role-permission.controller';

@Module({
  imports: [
    ResourcesModule,
    ActionsModule,
    PermissionsModule,
    RolesModule,
    RolePermissionModule,
  ],
  controllers: [
    ResourcesController,
    ActionsController,
    PermissionsController,
    RolesController,
    RolePermissionController,
  ],
})
export class AuthorizationModule {}
