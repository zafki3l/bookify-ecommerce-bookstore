import { Injectable } from '@nestjs/common';
import { IRolesCommandRepository } from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleTypeOrm } from '../../entities/role.entity';
import { EntityManager, Repository } from 'typeorm';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleNotFoundException } from '../../../domain/role-aggregate/exceptions/role-not-found.exception';
import { RoleMappers } from '../../mappers/roles.mapper';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { PermissionGranted } from '../../../domain/role-aggregate/events/permission-granted.event';
import { PermissionRevoked } from '../../../domain/role-aggregate/events/permission-revoked.event';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { RoleCreated } from '../../../domain/role-aggregate/events/role-created.event';
import { RoleRenamed } from '../../../domain/role-aggregate/events/role-renamed.event';
import { RoleCreatedHandler } from '../../event-handlers/roles/role-created.handler';
import { RoleRenamedHandler } from '../../event-handlers/roles/role-renamed.handler';
import { PermissionGrantedHandler } from '../../event-handlers/roles/permission-granted.handler';
import { PermissionRevokedHandler } from '../../event-handlers/roles/permission-revoked.handler';
import { RoleDeleted } from '../../../domain/role-aggregate/events/role-deleted.event';
import { RoleDeletedHandler } from '../../event-handlers/roles/role-deleted.handler';

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

  public async save(role: Role, performedBy: string): Promise<void> {
    await this.repository.manager.transaction(async (manager) => {
      for (const event of role.getDomainEvents()) {
        if (event instanceof RoleCreated) {
          await RoleCreatedHandler.handle(role, event, manager, performedBy);
        }

        if (event instanceof RoleRenamed) {
          await RoleRenamedHandler.handle(role, event, manager, performedBy);
        }

        if (event instanceof PermissionGranted) {
          await PermissionGrantedHandler.handle(event, manager, performedBy);
        }

        if (event instanceof PermissionRevoked) {
          await PermissionRevokedHandler.handle(event, manager, performedBy);
        }
      }
    });

    role.clearDomainEvents();
  }

  public async delete(role: Role, performedBy: string): Promise<void> {
    await this.repository.manager.transaction(async (manager) => {
      for (const event of role.getDomainEvents()) {
        if (event instanceof RoleDeleted) {
          await RoleDeletedHandler.handle(event, manager, performedBy);
        }
      }
    });

    role.clearDomainEvents();
  }
}
