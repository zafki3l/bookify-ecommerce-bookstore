import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrm } from './infrastructure/entities/user.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { UsersController } from './presentation/users/users.controller';
import { USERS_QUERY_REPOSITORY } from './domain/user-aggregate/repositories/users-query.repository.interface';
import { TypeOrmUsersQueryRepository } from './infrastructure/repositories/users/typeorm-users-query.repository';
import { FindUsersUseCase } from './application/user-use-cases/find-users/find-users.use-case';
import { FindOneUserUseCase } from './application/user-use-cases/find-one-users/find-one-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), SharedCacheModule],
  providers: [
    FindUsersUseCase,
    FindOneUserUseCase,
    {
      provide: USERS_QUERY_REPOSITORY,
      useClass: TypeOrmUsersQueryRepository,
    },
  ],
  exports: [USERS_QUERY_REPOSITORY],
  controllers: [UsersController],
})
export class UserManagementModule {}
