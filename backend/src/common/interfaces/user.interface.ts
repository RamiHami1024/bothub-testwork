import { User } from '@prisma/client';

export type SafetyUserData = Omit<User, 'password'>;
