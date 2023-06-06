import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { injectable } from 'inversify';
import { IUserRepository } from './user.interface';
import { User } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
    async getById(id: number): Promise<User> {
        return await User.findOneByOrFail({ id } as FindOptionsWhere<User>);
    }

    public async insert(user: User): Promise<User> {
        const data: User = User.create(user as User);
        return await data.save();
    }

    public async update(user: User): Promise<User> {
        const id = user.id;
        await User.update(id, { ...user } as User);
        return await this.getById(id);
    }

    public async delete(id: any): Promise<User> {
        const user: User = await User.findOneOrFail({
            where: { id },
        } as unknown as FindOneOptions<User>);
        return await User.remove(user as User);
    }

    public async getAll(): Promise<User[]> {
        return await User.find({
            order: { id: 'ASC' },
            // relations: [''],
        });
    }
}
