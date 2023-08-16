import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    const createdTask = new this.userModel(userDto);
    return createdTask.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByLogin(login: string): Promise<UserDocument> {
    const user = this.userModel.findOne({ login });
    return user;
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = this.userModel.findById(id);
    return user;
  }
}
