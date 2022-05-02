import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/types';
import { UserRoles } from 'src/common/decorators';
import { UserRoleGuard } from 'src/common/guards';

export const LocaleAuthGuard = (...roles: AuthUser['role'][]) =>
  applyDecorators(UserRoles(...roles), UseGuards(AuthGuard(), UserRoleGuard));
