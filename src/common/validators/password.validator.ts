import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import passwordValidator from 'password-validator';

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 36;
const validatorSchema = new passwordValidator();
validatorSchema
  .is()
  .min(PASSWORD_MIN_LENGTH)
  .is()
  .max(PASSWORD_MAX_LENGTH)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

const validatorErrors = {
  min: `must be greater than or equal ${PASSWORD_MIN_LENGTH} letters`,
  max: `must be less than or equal ${PASSWORD_MAX_LENGTH} letters`,
  uppercase: 'must contain uppercase letters',
  lowercase: 'must contain lowercase letters',
  digits: 'must contain one or more digits',
  spaces: 'must not contain spaces',
};

@ValidatorConstraint({ name: 'PasswordValidator', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    return validatorSchema.validate(password) as boolean;
  }

  defaultMessage(args: ValidationArguments) {
    const errorsList = validatorSchema.validate(args.value, {
      list: true,
    }) as string[];
    return errorsList
      .map((errorName) => {
        return validatorErrors[errorName as any];
      })
      .join(', ');
  }
}
