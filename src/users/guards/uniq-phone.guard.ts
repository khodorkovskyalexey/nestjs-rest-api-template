import { ExecutionContext, Injectable } from '@nestjs/common';
import { BaseUniqRecordsFieldGuard } from 'src/common/guards';
import { User } from '../enitities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UniqPhoneGuard extends BaseUniqRecordsFieldGuard<User> {
  constructor(protected readonly usersRepository: UsersRepository) {
    super(usersRepository, 'phone');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context);
  }
}
