import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: process.env.USER || dbConfig.username,
  password: process.env.PASSWORD || dbConfig.password,
  database: process.env.DATABASE || dbConfig.database,
  autoLoadEntities: true,
  synchronize: dbConfig.synchronize,
};
