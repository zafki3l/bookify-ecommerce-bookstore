import { Action } from '../../domain/entities/action.entity';
import { ActionTypeOrm } from '../entities/action.entity';

export class ActionsMapper {
  static toDomain(actionTypeOrm: ActionTypeOrm): Action {
    return Action.create(actionTypeOrm.name);
  }

  static toTypeOrm(action: Action): ActionTypeOrm {
    const actionTypeOrm = new ActionTypeOrm();

    actionTypeOrm.id = action.getId();
    actionTypeOrm.name = action.getName();

    return actionTypeOrm;
  }
}
