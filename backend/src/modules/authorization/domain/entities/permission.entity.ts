import { ActionIdEmptyException } from '../exceptions/actions/action-id-empty.exception';
import { ActionIdTooLongException } from '../exceptions/actions/action-id-too-long.exception';
import { PermissionIdEmptyException } from '../exceptions/permissions/permission-id-empty.exception';
import { ResourceIdEmptyException } from '../exceptions/resources/resource-id-empty.exception';
import { ResourceIdTooLongException } from '../exceptions/resources/resource-id-too-long.exception';

export class Permission {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private id: string,
    private resourceId: string,
    private actionId: string,
  ) {}

  static create(id: string, resourceId: string, actionId: string): Permission {
    if (!resourceId) {
      throw new ResourceIdEmptyException();
    }

    if (!actionId) {
      throw new ActionIdEmptyException();
    }

    if (!id) {
      throw new PermissionIdEmptyException();
    }

    if (resourceId.length > this.MAX_LENGTH) {
      throw new ResourceIdTooLongException();
    }

    if (actionId.length > this.MAX_LENGTH) {
      throw new ActionIdTooLongException();
    }

    return new Permission(id, resourceId, actionId);
  }

  static fromPersistent(
    id: string,
    resourceId: string,
    actionId: string,
  ): Permission {
    return new Permission(id, resourceId, actionId);
  }

  getId(): string {
    return this.id;
  }

  getResourceId(): string {
    return this.resourceId;
  }

  getActionId(): string {
    return this.actionId;
  }
}
