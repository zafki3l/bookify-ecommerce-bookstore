import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class RoleDeleted extends DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly permissionsRevoked: string[],
  ) {
    super();
  }
}
