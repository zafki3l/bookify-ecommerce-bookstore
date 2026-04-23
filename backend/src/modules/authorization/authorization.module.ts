import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions.module';
import { PermissionsController } from './presentation/permissions/permissions.controller';
import { RolesModule } from './roles.module';

@Module({
  imports: [PermissionsModule, RolesModule],
  controllers: [PermissionsController],
})
export class AuthorizationModule {}
