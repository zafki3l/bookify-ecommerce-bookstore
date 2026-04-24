import { DomainException } from '../../../../shared/domain/exception/domain.exception';

export class UserGenderInvalidException extends DomainException {
  constructor() {
    super('Gender invalid option', 'GENDER_INVALID');
  }
}
