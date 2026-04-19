import { Action } from '../../entities/action.entity';

export interface IActionsCommandRepository {
  save(action: Action): Promise<void>;
}

export const ACTIONS_COMMAND_REPOSITORY = 'IActionsCommandRepository';
