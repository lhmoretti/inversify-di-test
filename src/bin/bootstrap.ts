import express from 'express';
import helmet from 'helmet';
import { devErrorHandler } from '../middlewares/error.middleware';
import { Routes } from '../routes';
import { Config } from './config';
const config: Config = new Config();

import compression from 'compression';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { DiContainer } from './inversify.config';

export default class AppBootstrap {
    private loggerMorgan = require('morgan');

    public app: express.Application = express();
    public appRoutes: Routes;

    constructor() {
        console.log('Loading Server...');
        this.appRoutes = new DiContainer().container.resolve<Routes>(Routes);
        this.init()
    }

    private async init() {
        this.middlewares();
        this.setRoutes();
        await this.connectDatabases();
        this.setApp();
    }

    async connectDatabases() {
        await config.connectDatabases();
    }

    private middlewares() {
        this.app.use(devErrorHandler);
        this.app.use(this.loggerMorgan('dev'));
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use('/static', express.static(__dirname + '/public'));
        this.app.use(compression());
        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            next();
        });
    }

    private setRoutes() {
        const router = express.Router();

        this.appRoutes.routes(router);

        this.app.use('/api', router);
    }

    private setApp() {
        this.app.set('port', config.port);

        this.app.listen(config.port, async () => {
            console.log(`App listening on port: ${config.port}`);
        });
    }
}
