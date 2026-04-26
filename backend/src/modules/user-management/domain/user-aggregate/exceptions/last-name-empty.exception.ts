import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class LastNameEmptyException extends DomainException {
  public constructor() {
    super('Last name is required,', 'LAST_NAME_EMPTY');
  }
}
