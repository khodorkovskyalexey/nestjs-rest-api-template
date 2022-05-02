import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminRole } from 'src/admins/admins.types';
import { Admin } from '../entities';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AdminRole[]>('roles', context.getHandler());

    if (!roles.length) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as Admin;

    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
