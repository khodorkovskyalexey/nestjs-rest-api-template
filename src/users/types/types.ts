import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from 'src/auth/auth.types';
import { UserInput } from '../inputs';

export type AuthUser = IAuthResponse<UserInput>;

export class AuthUserDto implements AuthUser {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserInput;
}
