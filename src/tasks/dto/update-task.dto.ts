import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'New Task', description: 'Title of the new task' })
  readonly title: string;

  @ApiProperty({
    example: 'TODO',
    description: 'will be set automatically',
  })
  @IsString()
  readonly status: string;
}
