import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, Validate } from 'class-validator';
import { LocaleSignInDto } from 'src/auth/auth.types';
import { PasswordValidator } from 'src/common/validators';
import { UserInput } from './user.crud.input';

export class UserSignInInput extends PickType(UserInput, ['email']) implements LocaleSignInDto {
  @ApiProperty({ example: 'Password123', description: 'Password', type: String })
  @IsDefined()
  @Validate(PasswordValidator)
  password: string;
}
