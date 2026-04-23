import { EmailEmptyException } from '../../exceptions/email/email-empty.exception';
import { EmailInvalidException } from '../../exceptions/email/email-invalid.exception';
import { EmailTooLongException } from '../../exceptions/email/email-too-long.exception';

export class Email {
  private static MAX_LENGTH = 100;

  private readonly value: string;

  private constructor(value: string) {
    const trimmed = value.trim();

    if (this.isEmpty(trimmed)) {
      throw new EmailEmptyException();
    }

    if (this.isTooLong(trimmed.length)) {
      throw new EmailTooLongException();
    }

    if (!this.isValid(trimmed)) {
      throw new EmailInvalidException(trimmed);
    }

    this.value = trimmed.toLowerCase();
  }

  static create(email: string): Email {
    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isTooLong(length: number): boolean {
    return length > Email.MAX_LENGTH;
  }

  private isEmpty(email: string): boolean {
    return !email || !email.trim();
  }
}
