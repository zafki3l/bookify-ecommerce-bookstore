import { Module } from '@nestjs/common';
import { UsersController } from './presentention/controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrm } from './infrastructure/entities/user.entity';
import { SharedCacheModule } from '../../shared/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm]), SharedCacheModule],
  controllers: [UsersController],
})
export class UserManagementModule {}
