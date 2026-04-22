import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionTypeOrm } from './domain/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionTypeOrm])],
})
export class RolePermissionModule {}
