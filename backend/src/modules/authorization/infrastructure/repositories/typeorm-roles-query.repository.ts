import { Injectable } from '@nestjs/common';
import { IRolesQueryRepository } from '../../domain/role-aggregate/repositories/roles-query.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleTypeOrm } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { RoleReadModel } from '../../domain/read-models/role.read-model';

@Injectable()
export class TypeOrmRolesQueryRepository implements IRolesQueryRepository {
  public constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
  ) {}

  public async findAll(): Promise<RoleReadModel[]> {
    const roles = await this.repository.find({
      relations: {
        rolePermissions: true,
      },
    });

    return roles.map((role) => {
      const permissions = role.rolePermissions.map(
        (rolePermission) => rolePermission.permissionId,
      );

      return new RoleReadModel(role.id, role.name, permissions);
    });
  }

  public async findOne(id: string): Promise<RoleReadModel | null> {
    const role = await this.repository.findOne({
      where: { id },
      relations: {
        rolePermissions: true,
      },
    });

    if (!role) {
      return null;
    }

    const permissions = role.rolePermissions.map(
      (rolePermission) => rolePermission.permissionId,
    );

    return new RoleReadModel(role.id, role.name, permissions);
  }
}
