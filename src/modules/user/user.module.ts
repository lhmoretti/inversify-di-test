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
            bind<UserRouter>(UserRouter).toSelf().inSingletonScope();
            bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository).inSingletonScope();
            bind<UserRepository>(UserRepository).toSelf().inSingletonScope();
            bind<UserController>(UserController).toSelf().inSingletonScope();
            bind<UserService>(UserService).toSelf().inSingletonScope();
        });
    }
}
