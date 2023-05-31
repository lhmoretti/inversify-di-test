import { Container } from 'inversify';
import { UserModule } from '../modules/user/user.module';

export class DiContainer {
    public container: Container;

    constructor() {
        this.configure();
    }

    public configure() {
        this.container = new Container({
            skipBaseClassChecks: true,
        });

        this.container.load(new UserModule());
    }
}
