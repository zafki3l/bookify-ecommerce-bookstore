import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeOrm } from './infrastructure/entities/permission.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionTypeOrm]), SharedCacheModule],
})
export class PermissionsModule {}
