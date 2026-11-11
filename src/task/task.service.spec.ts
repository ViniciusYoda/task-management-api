import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '../db/entities/task.entity.js';
import { TaskDto, TaskStatusEnum } from './task.dto.js';
import { TaskService } from './task.service.js';

describe('TaskService', () => {
  it('preserves the stored status when an update omits status', async () => {
    const repository = {
      findOne: vi.fn().mockResolvedValue({ id: 'task-id', status: 'IN_PROGRESS' }),
      update: vi.fn().mockResolvedValue({ affected: 1 }),
    };
    const service = new TaskService(repository as unknown as Repository<TaskEntity>);
    await service.update('task-id', {
      title: 'Updated title',
      description: 'Updated description',
      expirationDate: new Date('2030-01-01'),
    } as TaskDto);
    expect(repository.update).toHaveBeenCalledWith('task-id', expect.objectContaining({
      title: 'Updated title', status: undefined,
    }));
  });

  it('rejects updates of missing tasks', async () => {
    const repository = {
      findOne: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };
    const service = new TaskService(repository as unknown as Repository<TaskEntity>);
    await expect(service.update('missing', { status: TaskStatusEnum.DONE } as TaskDto))
      .rejects.toBeInstanceOf(HttpException);
    expect(repository.update).not.toHaveBeenCalled();
  });
});
