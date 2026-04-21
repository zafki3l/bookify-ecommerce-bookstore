import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeOrm } from './infrastructure/entities/role.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { ROLES_QUERY_REPOSITORY } from './domain/repositories/roles/roles-query.repository.interface';
import { TypeOrmRolesQueryRepository } from './infrastructure/repositories/roles/typeorm-roles-query.repository';
import { ROLES_COMMAND_REPOSITORY } from './domain/repositories/roles/roles-command.repository.interface';
import { TypeOrmRolesCommandRepository } from './infrastructure/repositories/roles/typeorm-roles-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeOrm]), SharedCacheModule],
  providers: [
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
