import { Injectable } from '@nestjs/common';
import { IPermissionsCommandRepository } from '../../../domain/permission-aggregate/repositories/permission-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../../domain/permission-aggregate/permission.aggregate';
import { PermissionNotFoundException } from '../../../domain/permission-aggregate/exceptions/permission-not-found.exception';
import { PermissionsMapper } from '../../mappers/permissions.mapper';
import { PermissionCreated } from '../../../domain/permission-aggregate/events/permission-created.event';
import { PermissionCreatedHandler } from '../../event-handlers/permissions/permission-created.handler';
import { PermissionDeleted } from '../../../domain/permission-aggregate/events/permission-deleted.event';
import { PermissionDeletedHandler } from '../../event-handlers/permissions/permission-deleted.handler';

@Injectable()
export class TypeOrmPermissionsCommandRepository implements IPermissionsCommandRepository {
  public constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}

  public async findOne(id: string): Promise<Permission> {
    const permissionTypeOrm = await this.repository.findOne({ where: { id } });

    if (!permissionTypeOrm) {
      throw new PermissionNotFoundException(id);
    }

    return PermissionsMapper.toDomain(permissionTypeOrm);
  }

  public async save(
    permission: Permission,
    performedBy: string,
  ): Promise<void> {
    await this.repository.manager.transaction(async (manager) => {
      for (const event of permission.getDomainEvents()) {
        if (event instanceof PermissionCreated) {
          await PermissionCreatedHandler.handle(
            permission,
            event,
            manager,
            performedBy,
          );
        }
      }
    });
  }

  public async delete(
    permission: Permission,
    performedBy: string,
  ): Promise<void> {
    await this.repository.manager.transaction(async (manager) => {
      for (const event of permission.getDomainEvents()) {
        if (event instanceof PermissionDeleted) {
          await PermissionDeletedHandler.handle(event, manager, performedBy);
        }
      }
    });
  }
}
