import { Injectable } from '@nestjs/common';
import { IPermissionsCommandRepository } from '../../../domain/permission-aggregate/repositories/permission-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../../domain/permission-aggregate/permission.aggregate';
import { PermissionNotFoundException } from '../../../domain/permission-aggregate/exceptions/permission-not-found.exception';
import { PermissionsMapper } from '../../mappers/permissions.mapper';

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

  public async save(permission: Permission): Promise<void> {
    await this.repository.save(PermissionsMapper.toTypeOrm(permission));
  }

  public async delete(permission: Permission): Promise<void> {
    await this.repository.delete({ id: permission.getId() });
  }
}
