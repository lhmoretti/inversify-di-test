import { ContainerModule } from 'inversify';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRouter } from './user.routes';
import { UserRepository } from './user.repository';

export class UserModule extends ContainerModule {
    public constructor() {
        super((bind) => {
            bind(UserRouter).toSelf();
            bind(UserRepository).toSelf();
            bind(UserController).toSelf();
            bind(UserService).toSelf();
        });
    }
}
