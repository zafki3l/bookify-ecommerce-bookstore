import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class PasswordChanged extends DomainEvent {
  public constructor(public readonly userId: string) {
    super();
  }
}
