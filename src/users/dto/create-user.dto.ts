import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'User 1',
    description: 'User login',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    example: '1234456',
    description: 'User password',
  })
  @IsString()
  readonly password: string;
}
