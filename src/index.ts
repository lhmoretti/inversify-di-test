import 'reflect-metadata';
import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

import { Config } from './bin/config';
const config: Config = new Config();

import AppBootstrap from './bin/bootstrap';

const app = new AppBootstrap().app;

app.set('port', config.port);

app.listen(config.port, async () => {
    console.log('', `App listening on port: ${config.port}`);
});

export default app;
