import { ResourceIdEmptyException } from '../exceptions/resources/resource-id-empty.exception';
import { ResourceIdTooLongException } from '../exceptions/resources/resource-id-too-long.exception';
import { ResourceNameTooLongException } from '../exceptions/resources/resource-name-too-long.exception';

export class Resource {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private readonly id: string,
    private readonly name: string,
  ) {}

  static create(id: string, name: string): Resource {
    if (!id || id.trim() === '') {
      throw new ResourceIdEmptyException();
    }

    if (id.length > this.MAX_LENGTH) {
      throw new ResourceIdTooLongException();
    }

    if (name.length > this.MAX_LENGTH) {
      throw new ResourceNameTooLongException();
    }

    return new Resource(id.toLowerCase(), name);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
