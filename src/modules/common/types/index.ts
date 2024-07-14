import { UserRole } from 'src/modules/users/enums/user-role.enum';

export type JwtUserPayload = {
  userId: number;
  email: string;
  role: keyof typeof UserRole;
};
