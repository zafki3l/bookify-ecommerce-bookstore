import { Injectable } from '@nestjs/common';
import { IActionsCommandRepository } from '../../../domain/repositories/actions/actions-command.repository.interface';
import { Action } from '../../../domain/entities/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionTypeOrm } from '../../entities/action.entity';
import { Repository } from 'typeorm';
import { ActionsMapper } from '../../mappers/actions.mapper';

@Injectable()
export class TypeOrmActionsCommandRepository implements IActionsCommandRepository {
  constructor(
    @InjectRepository(ActionTypeOrm)
    private readonly repository: Repository<ActionTypeOrm>,
  ) {}

  async save(action: Action): Promise<void> {
    await this.repository.save(ActionsMapper.toTypeOrm(action));
  }
}
