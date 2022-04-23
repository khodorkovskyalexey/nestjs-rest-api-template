import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthNService } from 'src/auth/services';
import { User } from '../enitities';

import { UsersRepository } from '../repositories';
import { AuthUserDto } from '../types/types';

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
}
