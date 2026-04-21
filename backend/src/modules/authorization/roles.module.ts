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
import { CreateRoleHandler } from './application/commands/roles/create-role.handler';
import { ROLE_EXISTS_CHECKER } from './domain/services/roles/role-exists-checker.service';
import { RoleExistsChecker } from './infrastructure/services/roles/role-exists-checker.service';
import { UpdateRoleHandler } from './application/commands/roles/update-role.handler';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeOrm]), SharedCacheModule],
  providers: [
    CreateRoleHandler,
    UpdateRoleHandler,
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
    {
      provide: ROLE_EXISTS_CHECKER,
      useClass: RoleExistsChecker,
    },
  ],
  exports: [
    ROLES_QUERY_REPOSITORY,
    ROLES_COMMAND_REPOSITORY,
    ROLE_EXISTS_CHECKER,
  ],
})
export class RolesModule {}
