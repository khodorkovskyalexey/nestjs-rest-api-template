import { applyDecorators, UseGuards } from '@nestjs/common';
import { UniqRecordFieldsGuard } from '../guards';
import { Constructor } from '../guards/uniq-record-fields.guard';
import { RecordWithIdInterface } from '../interfaces';

export const UseUniqGuards = <T extends RecordWithIdInterface>(entity: Constructor<T>, fields: Array<keyof T>) =>
  applyDecorators(UseGuards(UniqRecordFieldsGuard(entity, fields)));
