import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeOrm } from './infrastructure/entities/role.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { ROLES_QUERY_REPOSITORY } from './domain/role-aggregate/repositories/roles-query.repository.interface';
import { TypeOrmRolesQueryRepository } from './infrastructure/repositories/typeorm-roles-query.repository';
import { FindRolesUseCase } from './application/use-cases/find-roles.use-case';
import { RolesController } from './presentation/controllers/roles/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleTypeOrm]), SharedCacheModule],
  controllers: [RolesController],
  providers: [
    FindRolesUseCase,
    {
      provide: ROLES_QUERY_REPOSITORY,
      useClass: TypeOrmRolesQueryRepository,
    },
  ],
  exports: [ROLES_QUERY_REPOSITORY],
})
export class RolesModule {}
