import { DataSource } from 'typeorm';
import { mongoDb } from '../data.source.mongo';

const mongo = {
    connectDb: async (): Promise<DataSource> => {
        try {
            const db = await mongoDb.initialize();
            console.log('Connected to MONGO');
            return db;
        } catch (error) {
            console.log('Error to connect MONGO');
            throw Error(error);
        }
    },
};

export default mongo;
