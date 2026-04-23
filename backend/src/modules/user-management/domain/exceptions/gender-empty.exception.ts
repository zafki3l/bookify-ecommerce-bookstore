import { DomainException } from '../../../../shared/exception/domain.exception';

export class UserGenderEmptyException extends DomainException {
  constructor() {
    super('Gender is required', 'GENDER_EMPTY');
  }
}
