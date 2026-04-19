import { Module } from '@nestjs/common';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { ResourcesModule } from './infrastructure/providers/resources.module';

@Module({
  imports: [ResourcesModule],
  controllers: [ResourcesController, ActionsController],
})
export class AuthorizationModule {}
