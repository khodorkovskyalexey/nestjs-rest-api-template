import { BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOneOptions } from 'typeorm';

interface FindOneRecordInterface<T> {
  findOne: (options?: FindOneOptions<T>) => Promise<T>;
}

interface RecordWithIdInterface {
  id: string;
}

export class BaseUniqRecordsFieldGuard<T extends RecordWithIdInterface> implements CanActivate {
  constructor(private readonly repository: FindOneRecordInterface<T>, private readonly field: keyof T) {}

  async canActivate(context: ExecutionContext, incomingFieldValue?: T[keyof T]): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const fieldValue = incomingFieldValue ?? (req.body[this.field] as string);
    const recordWithFieldValue = await this.repository.findOne({ where: { [this.field]: fieldValue }, select: ['id'] });
    if (recordWithFieldValue) {
      throw new BadRequestException(`Record with ${this.field} ${fieldValue} already exist`);
    }
    return true;
  }
}
