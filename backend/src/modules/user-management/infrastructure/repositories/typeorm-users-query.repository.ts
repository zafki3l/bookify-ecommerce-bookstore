import { InjectRepository } from '@nestjs/typeorm';
import { IUsersQueryRepository } from '../../domain/repositories/users-query.repository.interface';
import { UserTypeOrm } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../../application/dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUsersQueryRepository implements IUsersQueryRepository {
  constructor(
    @InjectRepository(UserTypeOrm)
    private readonly repository: Repository<UserTypeOrm>,
  ) {}

  async find(): Promise<UserDto[]> {
    const users = await this.repository.find();

    return users.map(
      (user) =>
        new UserDto(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.gender,
        ),
    );
  }

  async findOne(id: string): Promise<UserDto | null> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return new UserDto(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.gender,
    );
  }
}
