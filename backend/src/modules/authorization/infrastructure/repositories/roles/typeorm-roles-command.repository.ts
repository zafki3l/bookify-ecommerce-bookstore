import { Injectable } from '@nestjs/common';
import { IRolesCommandRepository } from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleNotFoundException } from '../../../domain/role-aggregate/exceptions/role-not-found.exception';
import { RoleMappers } from '../../mappers/roles.mapper';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { PermissionGranted } from '../../../domain/role-aggregate/events/permission-granted.event';
import { PermissionRevoked } from '../../../domain/role-aggregate/events/permission-revoked.event';

@Injectable()
export class TypeOrmRolesCommandRepository implements IRolesCommandRepository {
  public constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
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
    await this.repository.manager.transaction(async (manager) => {
      await manager.save(RoleMappers.toTypeOrm(role));

      for (const event of role.getDomainEvents()) {
        if (event instanceof PermissionGranted) {
          const rolePermissionTypeOrm = new RolePermissionTypeOrm();

          rolePermissionTypeOrm.roleId = event.roleId;
          rolePermissionTypeOrm.permissionId = event.permissionId;

          await manager.save(rolePermissionTypeOrm);
        }

        if (event instanceof PermissionRevoked) {
          await manager.delete(RolePermissionTypeOrm, {
            roleId: event.roleId,
            permissionId: event.permissionId,
          });
        }
      }
    });

    role.clearDomainEvents();
  }

  public async delete(role: Role): Promise<void> {
    await this.repository.delete({ id: role.getId() });
  }
}
