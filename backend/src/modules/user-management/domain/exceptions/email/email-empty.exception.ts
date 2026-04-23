import { DomainException } from '../../../../../shared/exception/domain.exception';

export class EmailEmptyException extends DomainException {
  constructor() {
    super('Email is required!', 'EMAIL_EMPTY');
  }
}
