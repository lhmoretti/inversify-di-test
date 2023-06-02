import { inject, injectable } from 'inversify';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@injectable()
export class UserService {
    private _userRepository: UserRepository;

    public constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {
        this._userRepository = this.userRepository;
    }

    async getById(id: number): Promise<User> {
        return this._userRepository.getById(id);
    }

    async getAll(): Promise<User[]> {
        return this._userRepository.getAll();
    }
}
