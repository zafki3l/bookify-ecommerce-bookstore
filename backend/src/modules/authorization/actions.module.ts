import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionTypeOrm } from './infrastructure/entities/action.entity';
import { ACTIONS_QUERY_REPOSITORY } from './domain/repositories/actions/actions-query.repository.interface';
import { TypeOrmActionsQueryRepository } from './infrastructure/repositories/actions/typeorm-actions-query.repository';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { CreateActionHandler } from './application/commands/actions/create-action.handler';
import { ACTION_EXISTS_CHECKER } from './domain/services/actions/action-exists-checker.service';
import { ActionExistsChecker } from './infrastructure/services/actions/action-exists-checker.service';
import { ACTIONS_COMMAND_REPOSITORY } from './domain/repositories/actions/actions-command.repository.interface';
import { TypeOrmActionsCommandRepository } from './infrastructure/repositories/actions/typeorm-actions-command.repository';
import { FindActionsHandler } from './application/queries/actions/find-actions-handler';
import { FindOneActionHandler } from './application/queries/actions/find-one-action.handler';
import { UpdateActionHandler } from './application/commands/actions/update-action.handler';
import { DeleteActionHandler } from './application/commands/actions/delete-action.handler';
import { RolePermissionController } from './presentation/controllers/role-permission/role-permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActionTypeOrm]), SharedCacheModule],
  providers: [
    CreateActionHandler,
    UpdateActionHandler,
    DeleteActionHandler,
    FindActionsHandler,
    FindOneActionHandler,
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
