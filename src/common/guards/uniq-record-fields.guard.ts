import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUniqRecordFieldsGuard, RecordWithIdInterface } from './base-uniq-record-fields.guard';

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
