import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { injectable } from 'inversify';
import { User } from './user.entity';
import { IUserRepository } from './user.interface';

@injectable()
export class UserRepositoryMock implements IUserRepository {
    async getById(id: number): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async insert(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async update(user: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async delete(id: any): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async getAll(): Promise<User[]> {
        const users: User[] = <User[]>[{ name: 'lucas' }, { name: 'leo' }];
        return Promise.resolve(users);
    }
}
