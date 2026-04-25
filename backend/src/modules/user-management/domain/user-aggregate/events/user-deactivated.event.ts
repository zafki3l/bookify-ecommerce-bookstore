import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class UserDeactivated extends DomainEvent {
  public constructor(public readonly id: string) {
    super();
  }
}
