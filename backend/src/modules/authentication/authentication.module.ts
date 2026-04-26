import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrm } from '../user-management/infrastructure/entities/user.entity';
import { UnitOfWorkModule } from '../../shared/unit-of-work/unit-of-work.module';
import { AUTHENTICABLE_USER_QUERY_REPOSITORY } from './domain/repositories/authenticable-user-query.repository.interface';
import { TypeOrmAuthenticableUserQueryRepository } from './infrastructure/repositories/typeorm-authenticable-user-query.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUseCase } from './application/use-cases/login/login.use-case';
import { UuidModule } from '../../shared/uuid/uuid.module';
import { AuthController } from './presentation/auth.controller';
import { SharedCacheModule } from '../../shared/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrm]),
    UnitOfWorkModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UuidModule,
    SharedCacheModule,
  ],
  providers: [
    LoginUseCase,
    {
      provide: AUTHENTICABLE_USER_QUERY_REPOSITORY,
      useClass: TypeOrmAuthenticableUserQueryRepository,
    },
  ],
  exports: [AUTHENTICABLE_USER_QUERY_REPOSITORY],
  controllers: [AuthController],
})
export class AuthenticationModule {}
