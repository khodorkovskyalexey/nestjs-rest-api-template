import { SetMetadata } from '@nestjs/common';
import { AdminRole } from 'src/admins/admins.types';

export const AdminRoles = (...roles: AdminRole[]) => SetMetadata('roles', roles);
