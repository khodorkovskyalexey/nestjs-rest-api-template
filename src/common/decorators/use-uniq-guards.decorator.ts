import { applyDecorators, UseGuards } from '@nestjs/common';
import { Constructor, RecordWithIdInterface, UniqRecordFieldsGuard } from '../guards';

export const UseUniqGuards = <T extends RecordWithIdInterface>(entity: Constructor<T>, fields: Array<keyof T>) =>
  applyDecorators(UseGuards(UniqRecordFieldsGuard(entity, fields)));
