import { UserReadModel } from '../../domain/read-models/user-read.model';

export class UserDto implements UserReadModel {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
  ) {}
}
