import { AggregateRoot } from '../../../../shared/domain/aggregate-root';
import { Email } from '../../../../shared/domain/value-objects/email/email.value-object';
import { Password } from '../../../../shared/domain/value-objects/password/password.value-object';
import { Gender } from './enums/gender.enum';
import { PasswordChanged } from './events/password-changed';
import { UserCreated } from './events/user-created.event';
import { UserDeactivated } from './events/user-deactivated.event';
import { PasswordNotMatchingException } from './exceptions/password-not-matching.exception';
import { PasswordVerifyFailed } from './exceptions/password-verify-failed.exception';

export class User extends AggregateRoot {
  private constructor(
    private readonly id: string,
    private firstName: string,
    private lastName: string,
    private email: Email,
    private gender: Gender,
    private password: Password,
    private isActive: boolean = true,
  ) {
    super();
  }

  public static async create(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    password: string,
  ): Promise<User> {
    const user = new User(
      id,
      firstName,
      lastName,
      Email.create(email),
      gender,
      await Password.create(password),
    );

    user.addDomainEvent(new UserCreated(id));

    return user;
  }

  public static fromPersistent(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    isActive: boolean,
  ): User {
    return new User(
      id,
      firstName,
      lastName,
      Email.create(email),
      gender as Gender,
      Password.fromHashed(password),
      isActive,
    );
  }

  public deactivate(): void {
    this.isActive = false;

    this.addDomainEvent(new UserDeactivated(this.id));
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ): Promise<void> {
    const isVerify = await this.password.compare(oldPassword);
    if (!isVerify) {
      throw new PasswordVerifyFailed();
    }

    const password = await Password.create(newPassword);

    const isMatch = await password.compare(newPasswordConfirm);
    if (!isMatch) {
      throw new PasswordNotMatchingException();
    }

    this.password = password;

    this.addDomainEvent(new PasswordChanged(this.id));
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getPassword(): string {
    return this.password.getValue();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getGender(): Gender {
    return this.gender;
  }
}
