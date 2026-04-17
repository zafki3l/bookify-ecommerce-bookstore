import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { CreateResourceHandler } from './application/commands/resources/create-resource.handler';
import { ResourceTypeOrm } from './infrastructure/entities/resource.entity';
import { FindResourcesHandler } from './application/queries/resources/find-resource.handler';
import { FineOneResourceHandler } from './application/queries/resources/find-one-resource.handler';
import { RESOURCES_COMMAND_REPOSITORY } from './domain/repositories/resources/resource-command.repository.interface';
import { TypeOrmResourcesCommandRepository } from './infrastructure/repositories/resources/typeorm-resources-command.repository';
import { RESOURCES_QUERY_REPOSITORY } from './domain/repositories/resources/resource-query.repository.interface';
import { TypeOrmResourcesQueryRepository } from './infrastructure/repositories/resources/typeorm-resources-query.repository';
import { UpdateResourceHandler } from './application/commands/resources/update-resource.handler';
import { DeleteResourceHandler } from './application/commands/resources/delete-resource.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTypeOrm])],
  controllers: [ResourcesController, ActionsController],
  providers: [
    CreateResourceHandler,
    UpdateResourceHandler,
    DeleteResourceHandler,
    FindResourcesHandler,
    FineOneResourceHandler,
    {
      provide: RESOURCES_COMMAND_REPOSITORY,
      useClass: TypeOrmResourcesCommandRepository,
    },
    {
      provide: RESOURCES_QUERY_REPOSITORY,
      useClass: TypeOrmResourcesQueryRepository,
    },
  ],
})
export class AuthorizationModule {}
