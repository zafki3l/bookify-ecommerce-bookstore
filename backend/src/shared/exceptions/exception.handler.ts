import { BadRequestException } from '@nestjs/common';
import { DomainException } from './domain.exception';

export default class ExceptionHandler {
  static handle(error: unknown): never {
    if (error instanceof DomainException) {
      throw new BadRequestException({
        message: error.message,
        code: error.code,
      });
    }

    throw error;
  }
}
