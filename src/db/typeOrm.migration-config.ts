import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from './entities/task.entity.js';
import { UserEntity } from './entities/user.entity.js';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<string>('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [TaskEntity, UserEntity],
  migrations: [import.meta.dirname + '/migrations/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);
