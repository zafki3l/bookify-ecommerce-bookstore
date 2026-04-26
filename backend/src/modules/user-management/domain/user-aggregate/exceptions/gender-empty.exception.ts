import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class GenderEmptyException extends DomainException {
  public constructor() {
    super('Gender is required,', 'GENDER_EMPTY');
  }
}
