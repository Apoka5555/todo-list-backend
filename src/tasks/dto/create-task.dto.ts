import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'New Task', description: 'Title of the new task' })
  @IsString()
  readonly title: string;
}
