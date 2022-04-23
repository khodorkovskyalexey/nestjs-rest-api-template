import { AdminRole } from 'src/admins/admins.types';
import { UserRole } from 'src/users/types/enums';

export interface AuthUser {
  id: string;
  role: UserRole | AdminRole;
}
