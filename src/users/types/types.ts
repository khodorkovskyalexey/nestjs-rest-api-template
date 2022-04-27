import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from 'src/auth/auth.types';
import { UserInput } from '../inputs';

export type AuthUserInterface = IAuthResponse<UserInput>;

export class AuthUserDto implements AuthUserInterface {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserInput;
}
