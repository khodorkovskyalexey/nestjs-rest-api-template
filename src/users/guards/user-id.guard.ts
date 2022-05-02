import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from 'src/common/types';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const user = req.user as AuthUser;
    const id = req.params['id'];

    return !id || user?.id === id;
  }
}
