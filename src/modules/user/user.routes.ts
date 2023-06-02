import express from 'express';
import { UserController } from './user.controller';
import * as mw from '../../middlewares/auth.middleware';
import { SUPERADMIN } from '../../helpers/roles';
import { catchErrors } from '../../middlewares/error.middleware';
import { inject, injectable } from 'inversify';

@injectable()
export class UserRouter {
    private _controller: UserController;

    public constructor(@inject(UserController) private readonly controller: UserController) {
        this._controller = this.controller;
    }

    public routes(router: express.Router): express.Router {
        router
            .route('/user/:id')
            .get(mw.isAllowed([SUPERADMIN]), catchErrors(this._controller.getById));

        router
            .route('/users')
            .get(mw.isAllowed([SUPERADMIN]), catchErrors(this._controller.getAll));

        return router;
    }
}
