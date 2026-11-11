import { TaskEntity } from './entities/task.entity.js';
import { UserEntity } from './entities/user.entity.js';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TaskEntity, UserEntity],
        migrations: [import.meta.dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
