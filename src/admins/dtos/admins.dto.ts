import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { AuthAdmin } from '../admins.types';
import { Admin } from '../entities';

export class AdminsSignInBodyDto {
  @ApiProperty({ example: 'admin@email.com', description: 'Admin email', type: String })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ example: 'admin@email.com', description: 'Password', type: String })
  @IsString()
  @Length(0, 254)
  password: string;
}

export class AuthAdminDto implements AuthAdmin {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: Admin;
}

export class AdminDto extends OmitType(Admin, ['password', 'hashPasswordBeforeInsert', 'hashPasswordBeforeUpdate']) {}
