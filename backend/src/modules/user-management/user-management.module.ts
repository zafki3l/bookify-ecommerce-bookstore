import { Module } from '@nestjs/common';
import { UsersController } from './presentention/controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrm } from './infrastructure/entities/user.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { USERS_QUERY_REPOSITORY } from './domain/repositories/users-query.repository.interface';
import { TypeOrmUsersQueryRepository } from './infrastructure/repositories/typeorm-users-query.repository';
import { FindUsersHandler } from './application/queries/find-users.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), SharedCacheModule],
  providers: [
    FindUsersHandler,
    {
      provide: USERS_QUERY_REPOSITORY,
      useClass: TypeOrmUsersQueryRepository,
    },
  ],
  exports: [USERS_QUERY_REPOSITORY],
  controllers: [UsersController],
})
export class UserManagementModule {}
