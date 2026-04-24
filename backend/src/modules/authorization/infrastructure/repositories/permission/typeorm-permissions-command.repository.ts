import { Injectable } from '@nestjs/common';
import { IPermissionsCommandRepository } from '../../../domain/permission-aggregate/repositories/permission-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../../domain/permission-aggregate/permission.aggregate';

@Injectable()
export class TypeOrmPermissionsCommandRepository implements IPermissionsCommandRepository {
  public constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}

  public async save(permission: Permission): Promise<void> {
    const permissionTypeOrm = new PermissionTypeOrm();

    permissionTypeOrm.id = permission.getId();
    permissionTypeOrm.resource = permission.getResource();
    permissionTypeOrm.action = permission.getAction();

    await this.repository.save(permissionTypeOrm);
  }
}
