import { Injectable } from '@nestjs/common';
import { IRolesCommandRepository } from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleNotFoundException } from '../../../domain/role-aggregate/exceptions/role-not-found.exception';

@Injectable()
export class TypeOrmRolesCommandRepository implements IRolesCommandRepository {
  public constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
  ) {}

  public async findOne(id: string): Promise<Role> {
    const roleTypeOrm = await this.repository.findOne({ where: { id } });

    if (!roleTypeOrm) {
      throw new RoleNotFoundException(id);
    }

    return Role.fromPersistence(roleTypeOrm.id, roleTypeOrm.name, []);
  }

  public async save(role: Role): Promise<void> {
    const roleTypeOrm = new RoleTypeOrm();

    roleTypeOrm.id = role.getId();
    roleTypeOrm.name = role.getName();

    await this.repository.save(roleTypeOrm);
  }
}
