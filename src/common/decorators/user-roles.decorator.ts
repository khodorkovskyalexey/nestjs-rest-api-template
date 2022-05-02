import { SetMetadata } from '@nestjs/common';
import { AuthUser } from '../types';

export const UserRoles = (...roles: AuthUser['role'][]) => SetMetadata('roles', roles);
