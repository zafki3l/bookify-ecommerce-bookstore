import { ActionIdEmptyException } from '../exceptions/actions/action-id-empty.exception';
import { ActionNameTooLongException } from '../exceptions/actions/action-name-too-long.exception';

export class Action {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private id: string,
    private name: string,
  ) {}

  static create(name: string): Action {
    if (name.length > this.MAX_LENGTH) {
      throw new ActionNameTooLongException();
    }

    const normalized = name.trim().toLowerCase();
    const formattedName =
      normalized.charAt(0).toUpperCase() + normalized.slice(1);

    const id = normalized;

    if (!id) {
      throw new ActionIdEmptyException();
    }

    return new Action(id, formattedName);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  updateName(name: string): void {
    if (name.length > Action.MAX_LENGTH) {
      throw new ActionNameTooLongException();
    }

    this.name = name;
  }
}
