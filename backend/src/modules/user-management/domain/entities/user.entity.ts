import { Email } from '../../../../shared/domain/value-objects/email/email.value-object';
import { Password } from '../../../../shared/domain/value-objects/password/password.value-object';
import { UserGenderEmptyException } from '../exceptions/gender-empty.exception';
import { UserFirstNameEmptyException } from '../exceptions/user-first-name-empty.exception';
import { UserGenderInvalidException } from '../exceptions/user-gender-invalid.exception';
import { UserIdEmptyException } from '../exceptions/user-id-empty.exception';
import { UserLastNameEmptyException } from '../exceptions/user-last-name-empty.exception';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class User {
  private constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private email: Email,
    private gender: string,
    private password: Password,
  ) {
    if (!id) {
      throw new UserIdEmptyException();
    }

    if (!firstName) {
      throw new UserFirstNameEmptyException();
    }

    if (!lastName) {
      throw new UserLastNameEmptyException();
    }

    if (!gender) {
      throw new UserGenderEmptyException();
    }

    if (!Object.values(Gender).includes(gender as Gender)) {
      throw new UserGenderInvalidException();
    }
  }

  static async create(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
  ): Promise<User> {
    return new User(
      id,
      firstName.trim(),
      lastName.trim(),
      Email.create(email),
      gender,
      await Password.create(password),
    );
  }

  static fromPersistent(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
  ): User {
    return new User(
      id,
      firstName,
      lastName,
      Email.create(email),
      gender,
      Password.fromHashed(password),
    );
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): Email {
    return this.email;
  }

  getGender(): string {
    return this.gender;
  }

  getPassword(): Password {
    return this.password;
  }
}
