import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from 'src/common/common.types';

@Injectable()
export class UserIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const user = req.user as AuthUser;
    const id = req.params['id'];

    return !id || user?.id === id;
  }
}
