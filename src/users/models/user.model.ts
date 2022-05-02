import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { pickObject } from 'src/utils';
import { User } from '../enitities';
import { AuthProvider, UserRole } from '../user.enums';

export class UserModel {
  @ApiProperty({ format: 'uuid', description: 'User id', type: String })
  id: string;

  @ApiProperty({ enum: UserRole, description: 'User role' })
  role: UserRole;

  @ApiProperty({ example: '+79000000000', description: 'User phone number', type: String })
  phone?: string;

  @ApiProperty({ example: 'Ivan', description: 'User first name', type: String })
  firstName?: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name', type: String })
  lastName?: string;

  @ApiProperty({ example: 'user@email.com', description: 'User email', type: String })
  email: string;

  @ApiProperty({ example: 'Password123', description: 'User password', type: String, minLength: 8, maxLength: 254 })
  @Exclude()
  password: string;

  @ApiProperty({ example: 'www.avatar.com', description: 'User avatar url', type: String })
  avatar?: string;

  @ApiProperty({ enum: AuthProvider, description: 'User auth provider' })
  authProvider: AuthProvider;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }

  static create(props: User) {
    const userModel = new UserModel({
      ...pickObject(props, [
        'id',
        'email',
        'firstName',
        'lastName',
        'phone',
        'avatar',
        'role',
        'authProvider',
        'createdAt',
        'updatedAt',
      ]),
    });
    return userModel;
  }
}
