import { DomainException } from '../../../../shared/exception/domain.exception';

export class UserGenderInvalidException extends DomainException {
  constructor() {
    super('Gender invalid option', 'GENDER_INVALID');
  }
}
