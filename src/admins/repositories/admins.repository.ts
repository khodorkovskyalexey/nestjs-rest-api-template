import * as crypto from 'crypto';

import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Admin } from '../entities';

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {
  async findByCredentials(email: string, password: string): Promise<Admin> {
    return this.createQueryBuilder(Admin.tableName)
      .where(`${Admin.tableName}.email = :email`, {
        email,
      })
      .andWhere(`${Admin.tableName}.password = :password`, {
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .getOne();
  }

  async findByCredentialsOrFail(email: string, password: string): Promise<Admin> {
    const admin = await this.findByCredentials(email, password);

    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    return admin;
  }
}
