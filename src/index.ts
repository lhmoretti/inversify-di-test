import 'reflect-metadata';
import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

import AppBootstrap from './bin/bootstrap';

const app = new AppBootstrap().app;

export default app;
