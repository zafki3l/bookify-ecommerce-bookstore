import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeOrm } from './infrastructure/entities/role.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { ROLES_QUERY_REPOSITORY } from './domain/repositories/roles/roles-query.repository.interface';
import { TypeOrmRolesQueryRepository } from './infrastructure/repositories/roles/typeorm-roles-query.repository';
import { ROLES_COMMAND_REPOSITORY } from './domain/repositories/roles/roles-command.repository.interface';
import { TypeOrmRolesCommandRepository } from './infrastructure/repositories/roles/typeorm-roles-command.repository';
import { FindRolesHandler } from './application/queries/roles/find-roles.handler';
import { FindOneRoleHandler } from './application/queries/roles/find-one-role.handler';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeOrm]), SharedCacheModule],
  providers: [
    FindRolesHandler,
    FindOneRoleHandler,
    {
      provide: ROLES_QUERY_REPOSITORY,
      useClass: TypeOrmRolesQueryRepository,
    },
    {
      provide: ROLES_COMMAND_REPOSITORY,
      useClass: TypeOrmRolesCommandRepository,
    },
  ],
  exports: [ROLES_QUERY_REPOSITORY, ROLES_COMMAND_REPOSITORY],
})
export class RolesModule {}
