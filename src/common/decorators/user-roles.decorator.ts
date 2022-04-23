import { SetMetadata } from '@nestjs/common';
import { AuthUser } from '../common.types';

export const UserRoles = (...roles: AuthUser['role'][]) => SetMetadata('roles', roles);
