import { Injectable } from '@nestjs/common';
import { IRolesCommandRepository } from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleNotFoundException } from '../../../domain/role-aggregate/exceptions/role-not-found.exception';
import { RoleMappers } from '../../mappers/roles.mapper';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';

@Injectable()
export class TypeOrmRolesCommandRepository implements IRolesCommandRepository {
  public constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,

    @InjectRepository(RolePermissionTypeOrm)
    private readonly rolePermissionRepository: Repository<RolePermissionTypeOrm>,
  ) {}

  public async findOne(id: string): Promise<Role> {
    const roleTypeOrm = await this.repository.findOne({
      where: { id },
      relations: { rolePermissions: true },
    });

    if (!roleTypeOrm) {
      throw new RoleNotFoundException(id);
    }

    return RoleMappers.toDomain(roleTypeOrm);
  }

  public async save(role: Role): Promise<void> {
    await this.repository.save(RoleMappers.toTypeOrm(role));

    await this.rolePermissionRepository.delete({ roleId: role.getId() });

    const rolePermissions = role.getPermissions().map((permissionId) => {
      const rolePermissionTypeOrm = new RolePermissionTypeOrm();

      rolePermissionTypeOrm.roleId = role.getId();
      rolePermissionTypeOrm.permissionId = permissionId;

      return rolePermissionTypeOrm;
    });

    if (rolePermissions.length > 0) {
      await this.rolePermissionRepository.insert(rolePermissions);
    }
  }
}
