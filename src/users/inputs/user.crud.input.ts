import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { AuthProvider, UserRole } from '../types/enums';

export class UserInput {
  @ApiProperty({ format: 'uuid', description: 'User id', type: String })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: UserRole, description: 'User role' })
  @IsDefined()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: '+79000000000', description: 'User phone number', type: String })
  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @ApiProperty({ example: 'Ivan', description: 'User first name', type: String })
  @IsOptional()
  @IsString()
  @Length(1, 254)
  firstName?: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name', type: String })
  @IsOptional()
  @IsString()
  @Length(1, 254)
  lastName?: string;

  @ApiProperty({ example: 'user@email.com', description: 'User email', type: String })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123', description: 'User password', type: String, minLength: 8, maxLength: 254 })
  @IsDefined()
  @IsString()
  @Length(8, 254)
  password: string;

  @ApiProperty({ example: 'www.avatar.com', description: 'User avatar url', type: String })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty({ enum: AuthProvider, description: 'User auth provider' })
  @IsDefined()
  @IsEnum(AuthProvider)
  authProvider: AuthProvider;
}

export class CreateUserInput extends OmitType(UserInput, ['id', 'authProvider', 'role']) {}

export class UpdateUserInput extends PartialType(CreateUserInput) {}
