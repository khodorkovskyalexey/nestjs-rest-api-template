import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthUser } from '../common.types';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AuthUser['role'][]>('roles', context.getHandler());

    if (!roles.length) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as AuthUser;

    await this._check(context, user);

    return true;
  }

  private async _check(context: ExecutionContext, user: AuthUser): Promise<boolean> {
    const roles = this.reflector.get<AuthUser['role'][]>('roles', context.getHandler());

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
