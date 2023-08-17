import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @ApiProperty({ example: 'New Task', description: 'Title of the new task' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'TODO',
    description: 'will be set automatically',
  })
  @Prop({ required: true })
  status: string;

  @ApiProperty({
    example: '2023-08-16T13:23:45.601Z',
    description: 'will be set automatically',
  })
  @Prop()
  createdDate: Date;

  @ApiProperty({
    example: '64d9c8a4db4ae8ebb02339b3',
    description: 'will be set automatically',
  })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
