import { InjectRepository } from '@nestjs/typeorm';
import { IRolesCommandRepository } from '../../../domain/repositories/roles/roles-command.repository.interface';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../domain/entities/role.entity';
import { RolesMapper } from '../../mappers/roles.mapper';
import { RoleNotFoundException } from '../../../domain/exceptions/roles/role-not-found.exception';

export class TypeOrmRolesCommandRepository implements IRolesCommandRepository {
  constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
  ) {}

  async findById(id: string): Promise<Role> {
    const role = await this.repository.findOne({ where: { id } });

    if (!role) {
      throw new RoleNotFoundException(id);
    }

    return RolesMapper.toDomain(role);
  }

  async save(role: Role): Promise<void> {
    await this.repository.save(RolesMapper.toModel(role));
  }

  async delete(role: Role): Promise<void> {
    await this.repository.delete({ id: role.getId() });
  }
}
