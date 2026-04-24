import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class ActionInvalidException extends DomainException {
  public constructor(action: string) {
    super(
      `Action with value '${action}' is not a valid option`,
      'ACTION_INVALID_OPTION',
    );
  }
}
