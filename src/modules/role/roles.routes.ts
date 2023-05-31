import express from 'express';
import { RolesController } from './roles.controller';
import * as mw from '../../middlewares/auth.middleware';
import { SUPERADMIN } from '../../helpers/roles';
import { catchErrors } from '../../middlewares/error.middleware';

export class RolesRouter {
    public controller: RolesController;

    constructor(_controller: RolesController) {
        this.controller = _controller;
    }
    public routes(router: express.Router): express.Router {
        return router;
    }
}
