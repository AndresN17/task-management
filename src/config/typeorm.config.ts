import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'taskManagement',
  autoLoadEntities: true,
  synchronize: true,
};
