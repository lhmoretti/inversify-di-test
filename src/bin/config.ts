import { DataSource } from 'typeorm';
import mongo from './mongo';
import Postgres from './postgres';

export class Config {
    private readonly env: NodeJS.ProcessEnv = process.env;

    constructor() {}

    private getValue(key: string, throwOnMissing = true): string | any {
        const value = this.env[key];

        if (!value && throwOnMissing) throw new Error(`Missing .env VALUE: ${key}`);

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    get nodeEnv(): string {
        return String(this.env.NODE_ENV);
    }

    get pkey() {
        return this.env.PKEY;
    }

    get port() {
        return this.env.PORT;
    }

    get jwtSecret() {
        return this.env.JWT_SECRET;
    }

    get jwtExp(): number {
        return parseInt(String(this.env.JWT_EXP), 0);
    }

    get jwtInnactivityExp(): number {
        return parseInt(String(this.env.JWT_INNACTIVITY_EXP), 0);
    }

    get connectNoSql(): boolean {
        return this.env.CONNECT_NO_SQL === 'true' ? true : false;
    }

    private async connectPostgres(): Promise<DataSource> {
        return await Postgres.connectDb();
    }

    private async connectMongo(): Promise<DataSource> {
        return await mongo.connectDb();
    }

    public async connectDatabases(): Promise<any> {
        console.log(`Connecting Databases..`);

        try {
            await this.connectPostgres();

            console.log(`(postgres) connected `);

            if (this.connectNoSql) {
                await this.connectMongo();
                console.log(`(mongodb) connected `);
            }
        } catch (error) {
            console.log(error);

            throw new Error('Error to connect to Database ');
        }
    }

    get databasePrefix(): string {
        return this.env.DB_PREFIX || '';
    }

    get mailApiKey() {
        return this.env.MAIL_API_KEY;
    }

    get mailFrom() {
        return this.env.MAIL_FROM;
    }
}

new Config().ensureValues([
    'PKEY',
    'PORT',
    'NODE_ENV',
    'BACKUPS_DIR',
    'CONNECT_NO_SQL',

    'JWT_SECRET',
    'JWT_EXP',
    'JWT_INNACTIVITY_EXP',

    'POSTGRES_NAME_CONNECTION',
    'POSTGRES_TYPE',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'POSTGRES_LOGGING',
    'POSTGRES_ENTITIES',
    'POSTGRES_MIGRATIONS',
    'POSTGRES_MIGRATIONS_CLI',

    'MONGO_TYPE',
    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_DATABASE',
    'MONGO_USERNAME',
    'MONGO_PASSWORD',

    'AWS_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',

    'MAIL_API_KEY',
    'MAIL_FROM',
]);
