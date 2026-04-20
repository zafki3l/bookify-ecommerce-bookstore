import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionTypeOrm } from './infrastructure/entities/permission.entity';

@Module({ imports: [TypeOrmModule.forFeature([PermissionTypeOrm])] })
export class PermissionsModule {}
