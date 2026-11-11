import { Module } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { TaskController } from './task.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../db/entities/task.entity.js';
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
