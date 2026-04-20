import { Injectable } from '@nestjs/common';
import { IPermissionQueryRepository } from '../../../domain/repositories/permissions/permissions-query.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmPermissionsQueryRepository implements IPermissionQueryRepository {
  constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}

  async find(): Promise<
    { id: string; resourceId: string; actionId: string }[]
  > {
    return await this.repository.find({
      select: ['id', 'resourceId', 'actionId'],
    });
  }

  async findOne(id: string): Promise<{
    id: string;
    resourceId: string;
    actionId: string;
  } | null> {
    const permission = await this.repository.findOne({
      where: { id },
    });

    if (!permission) return null;

    return permission;
  }
}
