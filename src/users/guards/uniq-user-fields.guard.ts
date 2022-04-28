import { ExecutionContext, Injectable } from '@nestjs/common';
import { BaseUniqRecordFieldsGuard } from 'src/common/guards';
import { User } from '../enitities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UniqUserFieldsGuard extends BaseUniqRecordFieldsGuard<User> {
  constructor(protected readonly usersRepository: UsersRepository) {
    super(usersRepository, ['phone', 'email']);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context);
  }
}
