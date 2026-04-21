import { InjectRepository } from '@nestjs/typeorm';
import { IRolesCommandRepository } from '../../../domain/repositories/roles/roles-command.repository.interface';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from '../../../domain/entities/role.entity';

export class TypeOrmRolesCommandRepository implements IRolesCommandRepository {
  constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
  ) {}

  async findById(id: string): Promise<Role> {
    return Role.create(id);
  }

  async save(role: Role): Promise<void> {}

  async delete(role: Role): Promise<void> {}
}
