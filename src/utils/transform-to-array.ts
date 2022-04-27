import { Transform } from 'class-transformer';

export const TransformToArray = () =>
  Transform(({ value }) => (Array.isArray(value) ? value : [value]), { toClassOnly: true });
