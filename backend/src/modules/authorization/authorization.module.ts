import { Module } from '@nestjs/common';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { ResourcesModule } from './infrastructure/providers/resources.module';
import { ActionsModule } from './infrastructure/providers/actions.module';

@Module({
  imports: [ResourcesModule, ActionsModule],
  controllers: [ResourcesController, ActionsController],
})
export class AuthorizationModule {}
