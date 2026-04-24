import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions.module';
import { RolesModule } from './roles.module';

@Module({
  imports: [PermissionsModule, RolesModule],
})
export class AuthorizationModule {}
