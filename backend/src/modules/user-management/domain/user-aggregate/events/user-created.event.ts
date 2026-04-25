import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class UserCreated extends DomainEvent {
  public constructor(public readonly id: string) {
    super();
  }
}
