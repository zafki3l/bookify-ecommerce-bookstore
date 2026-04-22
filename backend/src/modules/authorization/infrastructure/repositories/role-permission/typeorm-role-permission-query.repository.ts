import { Injectable } from '@nestjs/common';
import { IRolePermissionQueryRepository } from '../../../domain/repositories/role-permission/role-permission-query.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmRolePermissionQueryRepository implements IRolePermissionQueryRepository {
  constructor(
    @InjectRepository(RolePermissionTypeOrm)
    private readonly repository: Repository<RolePermissionTypeOrm>,
  ) {}

  async find(): Promise<{ roleId: string; permissionId: string }[]> {
    return await this.repository.find();
  }

  async findOne(
    roleId: string,
    permissionId: string,
  ): Promise<{ roleId: string; permissionId: string } | null> {
    return this.repository.findOne({ where: { roleId, permissionId } });
  }
}
