import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthNService } from 'src/auth/services';
import { User } from '../enitities';
import { CreateUserInput } from '../inputs';
import { UserModel } from '../models';

import { UsersRepository } from '../repositories';
import { AuthUserDto } from '../user.types';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(UsersRepository) protected readonly repo: UsersRepository,
    private readonly authNService: AuthNService,
  ) {
    super(repo);
  }

  async signIn(email: string, password: string): Promise<AuthUserDto> {
    const user = await this.repo.findByCredentialsOrFail(email, password);
    const token = this.authNService.createAuthTokenOrFail(user);

    return { user, token };
  }

  async signUp(dto: CreateUserInput): Promise<AuthUserDto> {
    const user = await this.repo.save(this.repo.create(dto));
    const token = this.authNService.createAuthTokenOrFail(user);

    return { user: UserModel.create(user), token };
  }
}
