import bcrypt from 'bcrypt';
import { PasswordEmptyException } from './password-empty.exception';
import { PasswordTooShortException } from './password-too-short.exception';
import { PasswordTooLongException } from './password-too-long.exception';

export class Password {
  private static MAX_LENGTH = 100;
  private static MIN_LENGTH = 8;

  private readonly hashed: string;

  private constructor(hashed: string) {
    this.hashed = hashed;
  }

  static async create(plain: string): Promise<Password> {
    if (Password.isEmpty(plain)) {
      throw new PasswordEmptyException();
    }

    if (Password.isTooShort(plain)) {
      throw new PasswordTooShortException();
    }

    if (Password.isTooLong(plain)) {
      throw new PasswordTooLongException();
    }

    const hashed = await bcrypt.hash(plain, 10);

    return new Password(hashed);
  }

  static fromHashed(hashed: string): Password {
    return new Password(hashed);
  }

  async compare(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.hashed);
  }

  getValue(): string {
    return this.hashed;
  }

  private static isTooShort(plain: string): boolean {
    return plain.length < Password.MIN_LENGTH;
  }

  private static isTooLong(plain: string): boolean {
    return plain.length > Password.MAX_LENGTH;
  }

  private static isEmpty(plain: string): boolean {
    return !plain;
  }
}
