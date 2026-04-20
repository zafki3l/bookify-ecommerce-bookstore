import { InjectRepository } from '@nestjs/typeorm';
import { IPermissionsCommandRepository } from '../../../domain/repositories/permissions/permissions-command.repository.interface';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';

export class TypeOrmPermissionsCommandRepository implements IPermissionsCommandRepository {
  constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}
}
