import { Action } from '../../enums/action.enum';
import { Resource } from '../../enums/resource.enum';

export class Permission {
  private constructor(
    private readonly id: string,
    private readonly resource: Resource,
    private readonly action: Action,
  ) {}

  public static create(resource: Resource, action: Action): Permission {
    const id = `${resource}.${action}`;

    return new Permission(id.toLowerCase(), resource, action);
  }

  public static fromPersistent(
    id: string,
    resource: Resource,
    action: Action,
  ): Permission {
    return new Permission(id, resource, action);
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
