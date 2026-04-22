import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionTypeOrm } from './infrastructure/entities/role-permission.entity';
import { ROLE_PERMISSION_QUERY_REPOSITORY } from './domain/repositories/role-permission/role-permission-query.repository.interface';
import { TypeOrmRolePermissionQueryRepository } from './infrastructure/repositories/role-permission/typeorm-role-permission-query.repository';
import { FindRolePermissionHandler } from './application/queries/role-permission/find-role-permission.handler';
import { FindOneRolePermissionHandler } from './application/queries/role-permission/find-one-role-permission.handler';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionTypeOrm])],
  providers: [
    FindRolePermissionHandler,
    FindOneRolePermissionHandler,
    {
      provide: ROLE_PERMISSION_QUERY_REPOSITORY,
      useClass: TypeOrmRolePermissionQueryRepository,
    },
  ],
  exports: [ROLE_PERMISSION_QUERY_REPOSITORY],
})
export class RolePermissionModule {}
