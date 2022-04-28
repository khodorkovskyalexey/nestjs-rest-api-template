import { BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOneRecordInterface, RecordWithIdInterface } from '../interfaces';

export class IdExistGuard<T extends RecordWithIdInterface> implements CanActivate {
  constructor(private readonly repository: FindOneRecordInterface<T>) {}

  async canActivate(context: ExecutionContext, incomingId?: string | string[]): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const id = incomingId ?? (req.params['id'] as string);
      if (!id) {
        return true;
      }
      const recordWithId = await this.repository.findOne({ where: { id }, select: ['id'] });
      if (recordWithId) {
        throw new BadRequestException(`Id=${id} not found`);
      }

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
