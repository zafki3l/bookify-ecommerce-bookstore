import { Module } from '@nestjs/common';
import { UNIT_OF_WORK } from './application/unit-of-work';
import { TypeOrmUnitOfWork } from './infrastructure/typeorm-unit-of-work';

@Module({
  providers: [
    {
      provide: UNIT_OF_WORK,
      useClass: TypeOrmUnitOfWork,
    },
  ],
  exports: [UNIT_OF_WORK],
})
export class UnitOfWorkModule {}
