import { ResourceIdEmptyException } from '../exceptions/resources/resource-id-empty.exception';
import { ResourceNameEmptyException } from '../exceptions/resources/resource-name-empty.exception';
import { ResourceNameTooLongException } from '../exceptions/resources/resource-name-too-long.exception';

export class Resource {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private id: string,
    private name: string,
  ) {}

  static create(name: string): Resource {
    if (!name) {
      throw new ResourceNameEmptyException();
    }

    if (name.length > this.MAX_LENGTH) {
      throw new ResourceNameTooLongException();
    }

    const normalized = name.trim().toLowerCase();
    const formattedName =
      normalized.charAt(0).toUpperCase() + normalized.slice(1);

    const id = normalized;

    if (!id) {
      throw new ResourceIdEmptyException();
    }

    return new Resource(id, formattedName);
  }

  static fromPersistent(id: string, name: string): Resource {
    return new Resource(id, name);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  updateName(name: string): void {
    if (!name) {
      throw new ResourceNameEmptyException();
    }

    if (name.length > Resource.MAX_LENGTH) {
      throw new ResourceNameTooLongException();
    }

    this.name = name;
  }
}
