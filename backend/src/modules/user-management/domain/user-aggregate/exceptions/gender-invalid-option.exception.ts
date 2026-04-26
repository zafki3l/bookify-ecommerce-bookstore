import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class GenderInvalidOptionException extends DomainException {
  public constructor(gender: string) {
    super(
      `Gender with value '${gender}' is not a valid option`,
      'GENDER_INVALID_OPTION',
    );
  }
}
