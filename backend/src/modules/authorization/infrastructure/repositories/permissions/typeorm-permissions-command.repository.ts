import { InjectRepository } from '@nestjs/typeorm';
import { IPermissionsCommandRepository } from '../../../domain/repositories/permissions/permissions-command.repository.interface';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../../domain/entities/permission.entity';
import { PermissionsMapper } from '../../mappers/permissions.mapper';
import { PermissionNotFoundException } from '../../../domain/exceptions/permissions/permission-not-found.exception';

export class TypeOrmPermissionsCommandRepository implements IPermissionsCommandRepository {
  constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}

  async findById(id: string): Promise<Permission> {
    const permission = await this.repository.findOne({ where: { id } });

    if (!permission) {
      throw new PermissionNotFoundException(id);
    }

    return PermissionsMapper.toDomain(permission);
  }

  async save(permission: Permission): Promise<void> {
    await this.repository.save(PermissionsMapper.toModel(permission));
  }

  async delete(permission: Permission): Promise<void> {
    await this.repository.delete({ id: permission.getId() });
  }
}
