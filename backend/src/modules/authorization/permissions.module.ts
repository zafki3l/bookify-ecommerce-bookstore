import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeOrm } from './infrastructure/entities/permission.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { PermissionsController } from './presentation/permissions/permissions.controller';
import { PERMISSIONS_QUERY_REPOSITORY } from './domain/permission-aggregate/repositories/permission-query.repository.interface';
import { TypeOrmPermissionsQueryRepository } from './infrastructure/repositories/permission/typeorm-permissions-query.repository';
import { FindPermissionsUseCase } from './application/permission-use-cases/find-permissions/find-permissions.use-case';
import { FindOnePermissionUseCase } from './application/permission-use-cases/find-one-permission/find-one-permission.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionTypeOrm]), SharedCacheModule],
  controllers: [PermissionsController],
  providers: [
    FindPermissionsUseCase,
    FindOnePermissionUseCase,
    {
      provide: PERMISSIONS_QUERY_REPOSITORY,
      useClass: TypeOrmPermissionsQueryRepository,
    },
  ],
  exports: [PERMISSIONS_QUERY_REPOSITORY],
})
export class PermissionsModule {}
