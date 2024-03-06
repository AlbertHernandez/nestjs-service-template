import { config } from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
    type: 'postgres',
    url: process.env.POSTGRESQL_URI,
    entities: [`${path.resolve(__dirname, '../..')}/**/*.entity.{ts,js}`],
    synchronize: false,
});