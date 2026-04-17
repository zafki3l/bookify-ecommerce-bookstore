import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './infrastructure/entities/resource.entity';
import { ResourcesController } from './presentation/controllers/resources/resources.controller';
import { ActionsController } from './presentation/controllers/actions/actions.controller';
import { RESOURCE_REPOSITORY } from './domain/repositories/resource.repository.interface';
import { TypeOrmResourceRepository } from './infrastructure/repositories/typeorm-resource.repository';
import { CreateResourceHandler } from './application/commands/resources/create-resource.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourcesController, ActionsController],
  providers: [
    CreateResourceHandler,
    {
      provide: RESOURCE_REPOSITORY,
      useClass: TypeOrmResourceRepository,
    },
  ],
})
export class AuthorizationModule {}
