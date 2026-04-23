import { Email } from '../../../../shared/value-objects/email/email.value-object';

export class User {
  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private email: Email,
    private gender: string,
    private password: string,
  ) {}
}
