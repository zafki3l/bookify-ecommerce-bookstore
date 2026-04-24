import { DomainEvent } from '../../../../../shared/domain/domain-event';

export class PermissionGranted extends DomainEvent {
  constructor(
    public readonly roleId: string,
    public readonly permissionId: string,
  ) {
    super();
  }
}
