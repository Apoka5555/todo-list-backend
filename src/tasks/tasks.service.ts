import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getAllByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId });
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async getByTitleContains(title: string, userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ title: { $regex: title, $options: 'i' }, user: userId })
      .exec();
  }

  async create(taskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      createdDate: new Date(),
      status: 'TODO',
      user: userId,
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
