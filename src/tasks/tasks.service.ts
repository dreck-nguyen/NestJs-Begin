import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}
  async getTasks(user: User): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: { user: user } });
    if (!tasks.length) throw new NotFoundException('No tasks found');
    return tasks;
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id: id, user: user });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!task) throw new NotFoundException('Task not found');
    await this.tasksRepository.delete({ id: id });
    return task;
  }
  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!TaskStatus[status])
      throw new NotFoundException('Cannot update task status');
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    await this.tasksRepository.update({ id: id }, { status: status });
    return await this.getTaskById(id, user);
  }
}
