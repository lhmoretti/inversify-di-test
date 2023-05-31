import express from 'express';
import { AuthController } from './auth.controller';
import { catchErrors } from '../../middlewares/error.middleware';

export class LoginRoutes {
    public controller: AuthController;

    constructor(_controller: AuthController) {
        this.controller = _controller;
    }

    public routes(router: express.Router): express.Router {
        router.route('/login').post(catchErrors(this.controller.login));
        router.route('/register').post(catchErrors(this.controller.register));
        return router;
    }
}
