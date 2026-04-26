import { Gender } from '../../../domain/user-aggregate/enums/gender.enum';

export interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  password: string;
  roleId: string;
}
