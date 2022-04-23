import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ValidEmailPipe implements PipeTransform {
  transform(email: string) {
    const valid = isEmail(email);
    if (!valid) {
      throw new BadRequestException(`Invalid email ${email}`);
    }
    return email;
  }
}
