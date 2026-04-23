import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeOrm } from './infrastructure/entities/role.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { ROLES_QUERY_REPOSITORY } from './domain/role-aggregate/repositories/roles-query.repository.interface';
import { TypeOrmRolesQueryRepository } from './infrastructure/repositories/typeorm-roles-query.repository';
import { FindRolesUseCase } from './application/role-use-cases/find-roles/find-roles.use-case';
import { RolesController } from './presentation/controllers/roles/roles.controller';
import { FindOneRoleUseCase } from './application/role-use-cases/find-one-role/find-one-role.use-case';
import { ROLES_COMMAND_REPOSITORY } from './domain/role-aggregate/repositories/roles-command.repository.interface';
import { TypeOrmRolesCommandRepository } from './infrastructure/repositories/typeorm-roles.command.repository';
import { CreateRoleUseCase } from './application/role-use-cases/create-role/create-role.use-case';
import { ROLE_EXISTS_CHECKER } from './domain/role-aggregate/services/role-exists-checker.service.interface';
import { RoleExistsChecker } from './infrastructure/services/role-exists-checker.service';
import { RenameRoleUseCase } from './application/role-use-cases/rename-role/rename-role.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeOrm]), SharedCacheModule],
  controllers: [RolesController],
  providers: [
    FindRolesUseCase,
    FindOneRoleUseCase,
    CreateRoleUseCase,
    RenameRoleUseCase,
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
