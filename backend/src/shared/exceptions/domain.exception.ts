import { ErrorCode } from './error.code';

export abstract class DomainException extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
