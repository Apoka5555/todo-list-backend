import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getAllByUserId(user: UserDocument): Promise<Task[]> {
    return this.taskModel.find({ user: user._id });
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async create(taskDto: CreateTaskDto, user: UserDocument): Promise<Task> {
    const createdTask = new this.taskModel({
      createdDate: new Date(),
      status: 'TODO',
      user: user._id,
      ...taskDto,
    });
    return createdTask.save();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }
}
