import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrm } from './infrastructure/entities/user.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';
import { UsersController } from './presentation/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), SharedCacheModule],

  controllers: [UsersController],
})
export class UserManagementModule {}
