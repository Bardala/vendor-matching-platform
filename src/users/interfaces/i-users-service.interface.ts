import { User } from '../entities/user.entity';

export interface IUsersService {
  findOneById(id: number): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  create(userData: Partial<User>): Promise<User>;
  update(id: number, updateData: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
