import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class RoleRenamed extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly oldName: string,
    public readonly newName: string,
  ) {
    super();
  }
}
