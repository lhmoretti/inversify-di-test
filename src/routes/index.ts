import express from 'express';
import { inject, injectable } from 'inversify';
import { UserRouter } from '../modules/user/user.routes';

@injectable()
export class Routes {
    constructor(public userRouter: UserRouter) {}

    public routes(router: express.Router) {
        this.userRouter.routes(router);
    }
}
