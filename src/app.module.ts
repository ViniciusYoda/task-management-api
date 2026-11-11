import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    AuthModule,
    UsersModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
