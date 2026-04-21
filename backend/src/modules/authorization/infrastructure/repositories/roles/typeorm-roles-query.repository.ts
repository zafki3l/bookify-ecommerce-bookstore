import { InjectRepository } from '@nestjs/typeorm';
import { IRolesQueryRepository } from '../../../domain/repositories/roles/roles-query.repository.interface';
import { RoleTypeOrm } from '../../entities/role.entity';
import { Repository } from 'typeorm';

export class TypeOrmRolesQueryRepository implements IRolesQueryRepository {
  constructor(
    @InjectRepository(RoleTypeOrm)
    private readonly repository: Repository<RoleTypeOrm>,
  ) {}

  async find(): Promise<{ id: string; name: string }[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<{ id: string; name: string } | null> {
    const role = await this.repository.findOne({ where: { id } });

    return role ? role : null;
  }
}
