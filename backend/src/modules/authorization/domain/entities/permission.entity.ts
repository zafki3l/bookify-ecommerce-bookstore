import { ActionIdEmptyException } from '../exceptions/actions/action-id-empty.exception';
import { ResourceIdTooLongException } from '../exceptions/resources/resource-id-too-long.exception';

export class Permission {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private id: string,
    private resourceId: string,
    private actionId: string,
  ) {}

  static create(resourceId: string, actionId: string): Permission {
    if (resourceId.length > this.MAX_LENGTH) {
      throw new ResourceIdTooLongException();
    }

    if (actionId.length) {
      throw new ActionIdEmptyException();
    }

    const id = `${resourceId}:${actionId}`;

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
