import { Injectable } from '@nestjs/common';
import { IRolePermissionCommandRepository } from '../../../domain/repositories/role-permission/role-permission-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { Repository } from 'typeorm';
import { RolePermission } from '../../../domain/entities/role-permission.entity';
import { RolePermissionMapper } from '../../mappers/role-permission.mapper';
import { RolePermissionNotFoundException } from '../../../domain/exceptions/role-permission/role-permission-not-found.exception';

@Injectable()
export class TypeOrmRolePermissionCommandRepository implements IRolePermissionCommandRepository {
  constructor(
    @InjectRepository(RolePermissionTypeOrm)
    private readonly repository: Repository<RolePermissionTypeOrm>,
  ) {}

  async findOne(roleId: string, permissionId: string): Promise<RolePermission> {
    const rolePermissionTypeOrm = await this.repository.findOne({
      where: { roleId, permissionId },
    });

    if (!rolePermissionTypeOrm) {
      throw new RolePermissionNotFoundException(roleId, permissionId);
    }

    return RolePermissionMapper.toDomain(rolePermissionTypeOrm);
  }

  async save(rolePermission: RolePermission): Promise<void> {
    await this.repository.save(RolePermissionMapper.toModel(rolePermission));
  }

  async delete(rolePermission: RolePermission): Promise<void> {
    await this.repository.delete({
      roleId: rolePermission.getRoleId(),
      permissionId: rolePermission.getPermissionId(),
    });
  }
}
