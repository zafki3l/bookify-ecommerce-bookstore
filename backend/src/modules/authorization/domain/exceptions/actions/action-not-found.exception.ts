import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ActionNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Action with id ${id} is not found`, ErrorCode.NOT_FOUND);
  }
}
