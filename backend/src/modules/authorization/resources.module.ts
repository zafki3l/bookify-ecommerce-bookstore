import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceTypeOrm } from './infrastructure/entities/resource.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { CreateResourceHandler } from './application/commands/resources/create-resource.handler';
import { UpdateResourceHandler } from './application/commands/resources/update-resource.handler';
import { DeleteResourceHandler } from './application/commands/resources/delete-resource.handler';
import { FindResourcesHandler } from './application/queries/resources/find-resources.handler';
import { FineOneResourceHandler } from './application/queries/resources/find-one-resource.handler';
import { RESOURCES_COMMAND_REPOSITORY } from './domain/repositories/resources/resources-command.repository.interface';
import { TypeOrmResourcesCommandRepository } from './infrastructure/repositories/resources/typeorm-resources-command.repository';
import { RESOURCES_QUERY_REPOSITORY } from './domain/repositories/resources/resources-query.repository.interface';
import { TypeOrmResourcesQueryRepository } from './infrastructure/repositories/resources/typeorm-resources-query.repository';
import { RESOURCE_EXISTS_CHECKER } from './domain/services/resources/resource-exists-checker.service';
import { ResourceExistsChecker } from './infrastructure/services/resources/resource-exists-checker.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTypeOrm]), SharedCacheModule],
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
    {
      provide: RESOURCE_EXISTS_CHECKER,
      useClass: ResourceExistsChecker,
    },
  ],
  exports: [
    RESOURCES_COMMAND_REPOSITORY,
    RESOURCES_QUERY_REPOSITORY,
    RESOURCE_EXISTS_CHECKER,
  ],
})
export class ResourcesModule {}
