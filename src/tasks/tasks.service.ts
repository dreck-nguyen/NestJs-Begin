import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>) { }
  async getTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    if (!tasks.length) throw new NotFoundException('No tasks found')
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id: id });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, status: TaskStatus.OPEN })
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.getTaskById(id)
    if (!task) throw new NotFoundException('Task not found')
    await this.tasksRepository.delete({ id: id })
    return task
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    if (!TaskStatus[status]) throw new NotFoundException('Cannot update task status')
    if (!task) throw new NotFoundException(`Task ${id} not found`
    )
    await this.tasksRepository.update({ id: id }, { status: status })
    return await this.getTaskById(id)

  }
  // updateTaskStatusById(taskId: string, status: TaskStatus): Task {
  //   const task: Task = this.tasks.find((task) => task.id === taskId);
  //   if (!task) throw new NotFoundException(`Task ${taskId} not found `);
  //   task.status = status;
  //   return task;
  // }
}
