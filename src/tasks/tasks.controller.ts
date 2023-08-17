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
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Get All Task' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get('/all')
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @ApiOperation({ summary: 'Create User Tasks' })
  @ApiResponse({ status: 201, type: [Task] })
  @Get('/byUserId')
  async getUserTasks(@Req() request: Request): Promise<Task[]> {
    const cookie = request.cookies['jwt'];

    const user = await this.jwtService.verifyAsync(cookie);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.tasksService.getAllByUserId(user.id);
  }

  @ApiOperation({ summary: 'Get Tasks By Title Fragment' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get('/byTitleFragment')
  async getByTitleFragment(
    @Query('title') title: string,
    @Req() request: Request,
  ): Promise<Task[]> {
    const cookie = request.cookies['jwt'];

    const user = await this.jwtService.verifyAsync(cookie);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.tasksService.getByTitleContains(title, user.id);
  }

  @ApiOperation({ summary: 'Get Task By ID' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({ status: 201, type: Task })
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

  @ApiOperation({ summary: 'Delete Task' })
  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }

  @ApiOperation({ summary: 'Update Task' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':id')
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }
}
