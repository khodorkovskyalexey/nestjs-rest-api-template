export type ExceptionConstant = {
  code: string;
  status: number;
  defaultMessage: string;
};

export const DUBLICATE_KEY_VALUE: ExceptionConstant = {
  code: '23505',
  status: 409,
  defaultMessage: 'Something went wrong',
};
