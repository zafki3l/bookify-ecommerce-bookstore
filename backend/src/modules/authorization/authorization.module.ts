import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { RESOURCE_REPOSITORY } from './domain/repositories/resource.repository.interface';
import { TypeOrmResourceRepository } from './infrastructure/repositories/typeorm-resource.repository';
import { CreateResourceHandler } from './application/commands/resources/create-resource.handler';
import { ResourceTypeOrm } from './infrastructure/entities/resource.entity';
import { FindResourcesHandler } from './application/queries/resources/find-resource.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTypeOrm])],
  controllers: [ResourcesController, ActionsController],
  providers: [
    CreateResourceHandler,
    FindResourcesHandler,
    {
      provide: RESOURCE_REPOSITORY,
      useClass: TypeOrmResourceRepository,
    },
  ],
})
export class AuthorizationModule {}
