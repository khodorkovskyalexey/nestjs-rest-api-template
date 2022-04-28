import { BadRequestException, CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { FindOneRecordInterface, RecordWithIdInterface } from '../interfaces';

export type Constructor<T> = new (...args: any[]) => T;

export function UniqRecordFieldsGuard<T extends RecordWithIdInterface>(
  entity: Constructor<T>,
  fields: Array<keyof T>,
): Type<CanActivate> {
  class Guard extends BaseUniqRecordFieldsGuard<T> {
    constructor(@InjectRepository(entity) protected readonly injectedRepository: Repository<T>) {
      super(injectedRepository, fields);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      return super.canActivate(context);
    }
  }

  return mixin(Guard);
}

export class BaseUniqRecordFieldsGuard<T extends RecordWithIdInterface> implements CanActivate {
  constructor(private readonly repository: FindOneRecordInterface<T>, private readonly fields: Array<keyof T>) {}

  async canActivate(context: ExecutionContext, incomingFieldsValue?: Array<Partial<T>>): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const condition = this.fields.map(
      (field) => incomingFieldsValue?.find((value) => value[field]) ?? ({ [field]: req.body[field] } as Partial<T>),
    );
    const recordWithFieldValue = await this.repository.findOne({ where: condition, select: ['id'] });
    if (recordWithFieldValue) {
      throw new BadRequestException(`Record with this conditions already exist`);
    }

    return true;
  }
}
