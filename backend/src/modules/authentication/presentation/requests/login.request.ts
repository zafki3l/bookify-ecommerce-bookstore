import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ILoginRequest } from '../../application/use-cases/login/login.request';

export class LoginRequest implements ILoginRequest {
  @IsEmail()
  @IsNotEmpty()
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  public readonly password!: string;
}
