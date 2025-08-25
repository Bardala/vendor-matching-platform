import { User } from 'src/users/entities/user.entity';

export type SanitizedUser = Pick<User, 'id' | 'createdAt' | 'email' | 'role'>;
