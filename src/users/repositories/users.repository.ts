import * as crypto from 'crypto';

import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../enitities';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByCredentials(email: string, password: string): Promise<User> {
    return this.createQueryBuilder(`user`)
      .where(`user.email = :email`, {
        email,
      })
      .andWhere(`user.password = :password`, {
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .getOne();
  }

  async findByCredentialsOrFail(email: string, password: string): Promise<User> {
    const user = await this.findByCredentials(email, password);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
