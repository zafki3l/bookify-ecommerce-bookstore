import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ActionErrorCode } from './action-error-code';

export class ActionNotFoundException extends DomainException {
  constructor(id: string) {
    super(
      `Action with id ${id} is not found`,
      ActionErrorCode.ACTION_NOT_FOUND,
    );
  }
}
