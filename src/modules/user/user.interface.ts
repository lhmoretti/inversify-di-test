import { User } from "./user.entity";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    getById(id: any): Promise<User>;
    insert(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: any): Promise<User>;
}
