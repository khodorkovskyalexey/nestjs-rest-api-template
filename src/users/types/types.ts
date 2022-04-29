import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from 'src/auth/auth.types';
import { UserModel } from '../models';

export type AuthUserInterface = IAuthResponse<UserModel>;

export class AuthUserDto implements AuthUserInterface {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserModel;
}
