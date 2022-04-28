import { FindOneOptions } from 'typeorm';

export interface FindOneRecordInterface<T> {
  findOne: (options?: FindOneOptions<T>) => Promise<T>;
}
