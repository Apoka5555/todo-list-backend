import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Get('/byUserId')
  async getUserTasks(@Req() request: Request): Promise<Task[]> {
    const cookie = request.cookies['jwt'];

    const user = await this.jwtService.verifyAsync(cookie);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.tasksService.getAllByUserId(user.id);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: Request,
  ): Promise<Task> {
    const cookie = request.cookies['jwt'];

    const user = await this.jwtService.verifyAsync(cookie);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.tasksService.create(createTaskDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }
}
