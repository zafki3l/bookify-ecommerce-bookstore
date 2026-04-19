import { Module } from '@nestjs/common';
import { UUID_GENERATOR } from './domain/uuid-generator.interface';
import { UuidV4Generator } from './infrastructure/uuid-v4-generator';

@Module({
  providers: [
    {
      provide: UUID_GENERATOR,
      useClass: UuidV4Generator,
    },
  ],
  exports: [UUID_GENERATOR],
})
export class UuidModule {}
