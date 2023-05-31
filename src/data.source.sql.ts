import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const env: NodeJS.ProcessEnv = process.env;
const options: PostgresConnectionOptions = <PostgresConnectionOptions>{
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: parseInt(String(env.POSTGRES_PORT)),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    logging: true,
    synchronize: false,
    entities: [`${__dirname}/${env.POSTGRES_ENTITIES}`],
    migrations: [`${__dirname}/${env.POSTGRES_MIGRATIONS}`],
    migrationsTableName: 'di_test_migrations',
};

console.table(options);

export const sqlDb = new DataSource(options);
