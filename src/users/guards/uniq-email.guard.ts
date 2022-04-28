import { ExecutionContext, Injectable } from '@nestjs/common';
import { BaseUniqRecordsFieldGuard } from 'src/common/guards';
import { User } from '../enitities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UniqEmailGuard extends BaseUniqRecordsFieldGuard<User> {
  constructor(protected readonly usersRepository: UsersRepository) {
    super(usersRepository, 'email');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context);
  }
}
