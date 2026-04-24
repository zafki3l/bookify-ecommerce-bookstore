import { Injectable } from '@nestjs/common';
import { IPermissionsQueryRepository } from '../../../domain/permission-aggregate/repositories/permission-query.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionTypeOrm } from '../../entities/permission.entity';
import { PermissionReadModel } from '../../../domain/permission-aggregate/read-models/permission.read-model';

@Injectable()
export class TypeOrmPermissionsQueryRepository implements IPermissionsQueryRepository {
  public constructor(
    @InjectRepository(PermissionTypeOrm)
    private readonly repository: Repository<PermissionTypeOrm>,
  ) {}

  public async findAll(): Promise<PermissionReadModel[]> {
    const permissions = await this.repository.find();

    return permissions.map(
      (permission) =>
        new PermissionReadModel(
          permission.id,
          permission.resource,
          permission.action,
        ),
    );
  }

  public async findOne(id: string): Promise<PermissionReadModel | null> {
    const permission = await this.repository.findOne({ where: { id } });

    if (!permission) {
      return null;
    }

    return new PermissionReadModel(
      permission.id,
      permission.resource,
      permission.action,
    );
  }
}
