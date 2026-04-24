import { Action } from './enums/action.enum';
import { Resource } from './enums/resource.enum';
import { ActionInvalidException } from './exceptions/action-invalid.exception';
import { ResourceInvalidException } from './exceptions/resource-invalid.exception';

export class Permission {
  private constructor(
    private readonly id: string,
    private readonly resource: Resource,
    private readonly action: Action,
  ) {}

  public static create(resource: Resource, action: Action): Permission {
    const isIncludesInResource = Object.values(Resource).includes(resource);
    if (!isIncludesInResource) {
      throw new ResourceInvalidException(resource);
    }

    const isIncludesInAction = Object.values(Action).includes(action);
    if (!isIncludesInAction) {
      throw new ActionInvalidException(action);
    }

    const id = `${resource}.${action}`;

    return new Permission(id.toLowerCase(), resource, action);
  }

  public static fromPersistent(
    id: string,
    resource: string,
    action: string,
  ): Permission {
    return new Permission(id, resource as Resource, action as Action);
  }

  public getId(): string {
    return this.id;
  }

  public getResource(): Resource {
    return this.resource;
  }

  public getAction(): Action {
    return this.action;
  }
}
