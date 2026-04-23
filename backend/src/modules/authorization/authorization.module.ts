import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions.module';
import { PermissionsController } from './presentation/controllers/permissions/permissions.controller';
import { RolesController } from './presentation/controllers/roles/roles.controller';
import { RolesModule } from './roles.module';

@Module({
  imports: [PermissionsModule, RolesModule],
  controllers: [PermissionsController, RolesController],
})
export class AuthorizationModule {}
