import { applyDecorators, UseGuards } from '@nestjs/common';
import { Constructor, RecordWithIdInterface, UniqRecordFieldsGuard } from '../guards';

export function UseUniqGuards<T extends RecordWithIdInterface>(entity: Constructor<T>, fields: Array<keyof T>) {
  return applyDecorators(UseGuards(UniqRecordFieldsGuard(entity, fields)));
}
