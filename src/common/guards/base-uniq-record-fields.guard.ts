import { BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOneOptions } from 'typeorm';

interface FindOneRecordInterface<T> {
  findOne: (options?: FindOneOptions<T>) => Promise<T>;
}

interface RecordWithIdInterface {
  id: string;
}

export class BaseUniqRecordFieldsGuard<T extends RecordWithIdInterface> implements CanActivate {
  constructor(private readonly repository: FindOneRecordInterface<T>, private readonly fields: Array<keyof T>) {}

  async canActivate(
    context: ExecutionContext,
    incomingFieldsValue?: Array<Record<keyof T, T[keyof T]>>,
  ): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const condition = this.fields.map(
      (field) =>
        incomingFieldsValue?.find((value) => value[field]) ??
        ({ [field]: req.body[field] } as Record<keyof T, T[keyof T]>),
    );
    const recordWithFieldValue = await this.repository.findOne({ where: condition, select: ['id'] });
    if (recordWithFieldValue) {
      throw new BadRequestException(`Record with this conditions already exist`);
    }
    return true;
  }
}
