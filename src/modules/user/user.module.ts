import { ContainerModule } from 'inversify';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRouter } from './user.routes';
import { UserRepository } from './user.repository';
import { IUserRepository } from './user.interface';
import { USER_TYPES } from '../../types';

export class UserModule extends ContainerModule {
    public constructor() {
        super((bind) => {
            bind<UserRouter>(UserRouter).toSelf();
            bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
            bind<UserRepository>(UserRepository).toSelf();
            bind<UserController>(UserController).toSelf();
            bind<UserService>(UserService).toSelf();
        });
    }
}
