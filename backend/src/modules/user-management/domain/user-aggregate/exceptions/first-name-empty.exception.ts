import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class FirstNameEmptyException extends DomainException {
  public constructor() {
    super('First name is required,', 'FIRST_NAME_EMPTY');
  }
}
