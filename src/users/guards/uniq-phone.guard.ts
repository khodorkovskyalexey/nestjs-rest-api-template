import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersRepository } from '../repositories';

@Injectable()
export class UniqPhoneGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const phone = req.body['phone'] as string;
      const id = req.params['id'] as string;
      const user = await this.usersRepository.findOne({ where: { phone }, select: ['id'] });
      if (user && user.id !== id) {
        throw new BadRequestException(`User with phone ${phone} already exist`);
      }
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
