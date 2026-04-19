import { Injectable } from '@nestjs/common';
import { IActionsQueryRepository } from '../../../domain/repositories/actions/actions-query.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionTypeOrm } from '../../entities/action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmActionsQueryRepository implements IActionsQueryRepository {
  constructor(
    @InjectRepository(ActionTypeOrm)
    private readonly repository: Repository<ActionTypeOrm>,
  ) {}

  async find(): Promise<{ id: string; name: string }[]> {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: string): Promise<{ id: string; name: string } | null> {
    const action = await this.repository.findOne({ where: { id } });

    if (!action) return null;

    return {
      id: action.id,
      name: action.name,
    };
  }
}
