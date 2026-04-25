import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class PermissionDeleted extends DomainEvent {
  public constructor(public readonly id: string) {
    super();
  }
}
