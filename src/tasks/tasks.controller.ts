import { updateTaskStatus } from './dto/update-task-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }
  @Get()
  getAllTask(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Put('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() status: any): Promise<Task> {
    const updateStatus = status.status
    return this.tasksService.updateTaskStatus(id, updateStatus);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
