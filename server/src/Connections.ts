import { MongoClient } from 'mongodb';
import config from './config';

export let DB: MongoClient | undefined = undefined;

export const connectToDb = async () => {
    DB = new MongoClient(config.databaseUrl);

    await DB.connect((err) => {
        if(err) console.log(err)
    })
};
