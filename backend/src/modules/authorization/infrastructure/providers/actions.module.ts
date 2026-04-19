import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionTypeOrm } from '../entities/action.entity';
import { ACTIONS_QUERY_REPOSITORY } from '../../domain/repositories/actions/actions-query.repository.interface';
import { TypeOrmActionsQueryRepository } from '../repositories/actions/typeorm-actions-query.repository';
import { SharedCacheModule } from '../../../../shared/cache/cache.module';
import { CreateActionHandler } from '../../application/commands/actions/create-action.handler';
import { ACTION_EXISTS_CHECKER } from '../../domain/services/actions/action-exists-checker.service';
import { ActionExistsChecker } from '../services/actions/action-exists-checker.service';
import { ACTIONS_COMMAND_REPOSITORY } from '../../domain/repositories/actions/actions-command.repository.interface';
import { TypeOrmActionsCommandRepository } from '../repositories/actions/typorm-actions-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActionTypeOrm]), SharedCacheModule],
  providers: [
    CreateActionHandler,
    {
      provide: ACTIONS_QUERY_REPOSITORY,
      useClass: TypeOrmActionsQueryRepository,
    },
    {
      provide: ACTIONS_COMMAND_REPOSITORY,
      useClass: TypeOrmActionsCommandRepository,
    },
    {
      provide: ACTION_EXISTS_CHECKER,
      useClass: ActionExistsChecker,
    },
  ],
  exports: [
    ACTIONS_QUERY_REPOSITORY,
    ACTIONS_COMMAND_REPOSITORY,
    ACTION_EXISTS_CHECKER,
  ],
})
export class ActionsModule {}
