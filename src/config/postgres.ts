import { DataSource } from 'typeorm';
import { sqlDb } from '../data.source.sql';

const Postgres = {
    connectDb: async (): Promise<DataSource> => {
        try {
            const db = await sqlDb.initialize();
            console.log('Connected to Postgres');
            return db;
        } catch (error) {
            console.log(`# ~ error: `, error);
            console.log('Error to connect Postgres');
            throw Error(error);
        }
    },
};

export default Postgres;
