import { inject, injectable } from 'inversify';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@injectable()
export class UserService {
    public constructor(private readonly userRepository: UserRepository) {}

    async getById(id: number): Promise<User> {
        return this.userRepository.getById(id);
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }
}
