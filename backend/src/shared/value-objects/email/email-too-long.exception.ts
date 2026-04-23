import { DomainException } from '../../exception/domain.exception';

export class EmailTooLongException extends DomainException {
  constructor() {
    super('Email too long! (max: 100 characters)', 'EMAIL_TOO_LONG');
  }
}
