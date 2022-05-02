import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthUser } from '../types';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as AuthUser;

    return this._check(context, user);
  }

  private _check(context: ExecutionContext, user: AuthUser): boolean {
    const roles = this.reflector.get<AuthUser['role'][]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    if (!roles.length) {
      return false;
    }

    if (roles.includes(user.role)) {
      return true;
    } else {
      throw new ForbiddenException(
        `Invalid user role ${user.role.toUpperCase()}, required ${roles.length > 1 ? 'one of ' : ''}${roles
          .join(',')
          .toUpperCase()}`,
      );
    }
  }
}
