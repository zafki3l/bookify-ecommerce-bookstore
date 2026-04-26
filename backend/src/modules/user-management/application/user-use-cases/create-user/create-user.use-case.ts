import { Inject, Injectable } from '@nestjs/common';
import {
  type IUsersCommandRepository,
  USERS_COMMAND_REPOSITORY,
} from '../../../domain/user-aggregate/repositories/users-command.repository.interface';
import { ICreateUserRequest } from './create-user.request';
import {
  type IUnitOfWork,
  UNIT_OF_WORK,
} from '../../../../../shared/unit-of-work/application/unit-of-work';
import { User } from '../../../domain/user-aggregate/user.aggregate';
import {
  type IUuidGenerator,
  UUID_GENERATOR,
} from '../../../../../shared/uuid/domain/uuid-generator.interface';
import {
  AUDIT_LOG_COMMAND_REPOSITORY,
  type IAuditLogCommandRepository,
} from '../../../../audit-log/domain/audit-log-aggregate/repositories/audit-log-command.repository.interface';

@Injectable()
export class CreateUserUseCase {
  public constructor(
    @Inject(USERS_COMMAND_REPOSITORY)
    private readonly repository: IUsersCommandRepository,

    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: IUnitOfWork,

    @Inject(UUID_GENERATOR)
    private readonly uuid: IUuidGenerator,

    @Inject(AUDIT_LOG_COMMAND_REPOSITORY)
    private readonly auditLogRepository: IAuditLogCommandRepository,
  ) {}

  public async execute(
    request: ICreateUserRequest,
    performedBy: string,
  ): Promise<void> {
    const id = this.uuid.generate();

    const user = await User.create(
      id,
      request.firstName,
      request.lastName,
      request.email,
      request.gender,
      request.password,
      request.roleId,
    );

    await this.unitOfWork.execute(async () => {
      await this.repository.save(user);

      await this.auditLogRepository.write(
        'CREATE_USER',
        performedBy,
        'user-management',
        'users',
        {
          id: user.getId(),
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
          email: user.getEmail(),
          gender: user.getGender(),
          roleId: user.getRoleId(),
        },
      );

      user.clearDomainEvents();
    });
  }
}
