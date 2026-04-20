import { Module } from '@nestjs/common';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { ActionsModule } from './actions.module';
import { ResourcesModule } from './resources.module';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [ResourcesModule, ActionsModule, PermissionsModule],
  controllers: [ResourcesController, ActionsController],
})
export class AuthorizationModule {}
