import { Module } from '@nestjs/common';
import { CreateResourceHandler } from '../../application/commands/resources/create-resource.handler';
import { UpdateResourceHandler } from '../../application/commands/resources/update-resource.handler';
import { DeleteResourceHandler } from '../../application/commands/resources/delete-resource.handler';
import { FindResourcesHandler } from '../../application/queries/resources/find-resource.handler';
import { FineOneResourceHandler } from '../../application/queries/resources/find-one-resource.handler';
import { RESOURCES_COMMAND_REPOSITORY } from '../../domain/repositories/resources/resource-command.repository.interface';
import { TypeOrmResourcesCommandRepository } from '../repositories/resources/typeorm-resources-command.repository';
import { RESOURCES_QUERY_REPOSITORY } from '../../domain/repositories/resources/resource-query.repository.interface';
import { TypeOrmResourcesQueryRepository } from '../repositories/resources/typeorm-resources-query.repository';
import { RESOURCE_EXISTS_CHECKER } from '../../domain/services/resources/resource-exists-checker.service';
import { ResourceExistsChecker } from '../services/resources/resource-exists-checker.service';
import { SharedCacheModule } from '../../../../shared/cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceTypeOrm } from '../entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceTypeOrm]),
    SharedCacheModule,
    SharedCacheModule,
  ],
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
